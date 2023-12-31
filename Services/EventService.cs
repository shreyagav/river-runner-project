﻿using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.Context;
using Models.Dto;
using Services.Data;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class EventService : IEventService
    {
        private ApplicationDbContext _context;
        private readonly UserManager<AspNetUser> _userManager;
        private IMailService mailService;
        public EventService(ApplicationDbContext context, UserManager<AspNetUser> userManager, IMailService mail)
        {
            _context = context;
            _userManager = userManager;
            mailService = mail;
        }

        public async Task AddEventAttendees(int id, ClaimsPrincipal user)
        {
            var appUser = await _userManager.GetUserAsync(user);
            var evt = _context.CalendarEvents.Include(s => s.Site).Include(s => s.Site.Main).First(e => e.Id == id);
            if (evt.SiteId != appUser.SiteId && !evt.Site.AllowEverybody)
            {
                throw new Exception("Only chapter members can participate in this event.");
            }
            var temp = new UserEvent();
            temp.Created = DateTime.Now;
            temp.CreatedBy = appUser;
            temp.EventId = id;
            temp.UserId = appUser.Id;
            _context.UserEvents.Add(temp);
            await _context.SaveChangesAsync();
            string from = "webmaster@teamriverrunner.org";
            string fromName = "Webmaster Team River Runner";
            if (evt.Site.Main != null && !string.IsNullOrWhiteSpace(evt.Site.Main.Email))
            {
                from = evt.Site.Main.Email;
                fromName = evt.Site.Main.Name;
            }
            await mailService.Send($"You are going to attend {evt.Name} event",
                $"We are thrilled to see you at {new TimeDto(evt.StartTime).ToString()} on {evt.Date.ToString("D")}",
                null,
                (from, fromName),
                new[] { (appUser.Email, $"{appUser.FirstName} {appUser.LastName}") }
                );
        }

        public async Task<EventAttendeeDto[]> AddEventAttendees(int id, string[] ids, ClaimsPrincipal user)
        {
            var appUser = await _userManager.GetUserAsync(user);
            List<UserEvent> newAttendies = new List<UserEvent>();
            foreach (string usrId in ids)
            {
                var temp = new UserEvent();
                temp.Created = DateTime.Now;
                temp.CreatedBy = appUser;
                temp.EventId = id;
                temp.UserId = usrId;
                newAttendies.Add(temp);
            }
            _context.UserEvents.AddRange(newAttendies.ToArray());
            _context.SaveChanges();
            return GetEventAttendees(id);

        }

        public EventBudget[] DeleteBudgetLine(int eventId, EventBudget line)
        {
            _context.EventBudgets.Remove(line);
            _context.SaveChanges();
            return GetEventBudget(eventId);
        }

        public EventBudget[] AddBudgetLines(int eventId, EventBudget[] lines)
        {
            _context.EventBudgets.AddRange(lines);
            _context.SaveChanges();
            return GetEventBudget(eventId);
        }

        public EventBudget[] UpdateBudgetLine(int eventId, EventBudget line)
        {
            _context.Entry(line).State = EntityState.Modified;
            _context.SaveChanges();
            return GetEventBudget(eventId);
        }


        public EventBudget[] GetEventBudget(int eventId)
        {
            return _context.EventBudgets.Where(a => a.EventId == eventId).ToArray();
        }

        public async Task<EventMainDto> ChangeEvent(EventMainDto newEvent, ClaimsPrincipal user)
        {

            var appUser = await _userManager.GetUserAsync(user);
            var site = _context.EventSites.First(s => s.Id == newEvent.Site);
            var isAdmin = await _userManager.IsInRoleAsync(appUser, "Admin");
            if (site.AllowEverybody && !isAdmin)
            {
                throw new Exception("Only Administrators can add events to this chapter.");
            }

            if (newEvent.Id <= 0)
            {
                Func<DateTime, CalendarEvent> createEvent = (DateTime date) =>
                {
                    CalendarEvent evt = new CalendarEvent(newEvent);
                    evt.Date = date;
                    evt.Created = evt.Modified = DateTime.Now;
                    evt.CreatedById = appUser.Id;
                    evt.Status = (int)EventStatus.Draft;
                    return evt;
                };
                List<CalendarEvent> toAdd = new List<CalendarEvent>();
                if (newEvent.IsRepeatable)
                {
                    Func<DateTime, int, DateTime> dateCalc = (date, itr) => date.AddDays(itr * newEvent.Frequency);
                    switch (newEvent.FrequencyType)
                    {
                        case EventFrequency.Weeks:
                            dateCalc = (date, itr) => date.AddDays(itr * newEvent.Frequency * 7);
                            break;
                        case EventFrequency.Month:
                            dateCalc = (date, itr) => date.AddMonths(itr * newEvent.Frequency);
                            break;
                    }
                    int itr = 0;
                    DateTime date;
                    do
                    {
                        date = dateCalc(newEvent.Date, itr++);
                        toAdd.Add(createEvent(date));
                    }
                    while (date <= newEvent.EndDate);

                }
                else
                {
                    toAdd.Add(createEvent(newEvent.Date));
                }
                _context.AddRange(toAdd);
                _context.SaveChanges();
                newEvent.Id = toAdd[0].Id;
            }
            else
            {
                CalendarEvent temp;
                temp = _context.CalendarEvents.First(e => e.Id == newEvent.Id);
                temp.Map(newEvent);
                temp.Modified = DateTime.Now;
                temp.ModifiedById = appUser.Id;
                _context.Entry(temp).State = EntityState.Modified;
                _context.SaveChanges();
            }
            return newEvent;

        }

        public async Task<EventMainDto> GetEvent(int id, ClaimsPrincipal user)
        {
            var evt = _context.CalendarEvents.Include(a => a.EventType).First(e => e.Id == id);
            var appUser = await _userManager.GetUserAsync(user);
            var res = new EventMainDto(evt);
            if (appUser != null)
            {
                var userGoing = _context.UserEvents.Where(a => a.EventId == evt.Id && a.UserId == appUser.Id).FirstOrDefault();
                res.CurentUserAttends = userGoing != null;
            }
            else
            {
                res.CurentUserAttends = false;
            }
            return res;
        }

        private int tempMemberType()
        {
            return new Random().Next(1, 3);
        }

        public EventAttendeeDto[] GetEventAttendees(int eventId)
        {
            var res = _context.UserEvents
                .Where(ue => ue.EventId == eventId)
                .Include(e => e.User)
                .Select(u => new EventAttendeeDto()
                {
                    Id = u.UserId,
                    FirstName = u.User.FirstName,
                    LastName = u.User.LastName,
                    Email = u.User.Email,
                    MemberTypeId = tempMemberType(),
                    Phone = u.User.PhoneNumber,
                    SiteId = u.User.SiteId,
                    Attended = u.Attended.HasValue ? u.Attended.Value : false
                }).ToArray();
            return res;
        }

        public async Task RemoveEventAttendees(int eventId, ClaimsPrincipal user)
        {
            var appUser = await _userManager.GetUserAsync(user);
            var toRemove = _context.UserEvents.First(ue => ue.UserId == appUser.Id && ue.EventId == eventId);
            _context.UserEvents.Remove(toRemove);
            await _context.SaveChangesAsync();
        }

        public EventAttendeeDto[] RemoveEventAttendees(int eventId, EventAttendeeDto attendee)
        {
            var toRemove = _context.UserEvents.First(ue => ue.UserId == attendee.Id && ue.EventId == eventId);
            _context.UserEvents.Remove(toRemove);
            _context.SaveChanges();
            return GetEventAttendees(eventId);
        }

        public EventAttendeeDto[] GetSiteMembers(int eventId)
        {
            int siteId = _context.CalendarEvents.First(a => a.Id == eventId).SiteId;
            var ids = _context.UserEvents.Where(ue => ue.EventId == eventId).Select(a => a.UserId);
            var res = _context.AspNetUsers
                .Where(ue => /*ue.SiteId == siteId &&*/ !ids.Contains(ue.Id))
                .Select(u => new EventAttendeeDto()
                {
                    Id = u.Id,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Email = u.Email,
                    MemberTypeId = tempMemberType(),
                    Phone = u.PhoneNumber,
                    Active = u.Active,
                    SiteId = u.SiteId
                }).OrderBy(a => a.FirstName).ThenBy(a => a.LastName)
                .ToArray();
            return res;
        }

        public void AddPhotos(Photo[] arr)
        {
            _context.Photos.AddRange(arr);
            _context.SaveChanges();
        }

        public Photo[] GetEventPhotos(int id)
        {
            return _context.Photos.Where(p => p.EventId == id).ToArray();
        }

        public Photo GetPhotoById(int id)
        {
            return _context.Photos.FirstOrDefault(a => a.Id == id);
        }

        public dynamic ToggleAttendance(ToggleAttendanceDto dto)
        {
            string error = "";
            try
            {
                var userEvent = _context.UserEvents.FirstOrDefault(a => a.EventId == dto.EventId && a.UserId == dto.UserId);
                if (userEvent != null)
                {
                    userEvent.Attended = dto.Attended;
                    _context.SaveChanges();
                    return new { Ok = true };
                }
                else
                {
                    error = "Attendee not found at this event";
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return new { error };

        }

        public EventAttendeeDto[] GetSiteMembersOnly(int siteId)
        {
            var res = _context.AspNetUsers
                .Where(ue => ue.SiteId == siteId)
                .Select(u => new EventAttendeeDto()
                {
                    Id = u.Id,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Email = u.Email,
                    MemberTypeId = tempMemberType(),
                    Phone = u.PhoneNumber,
                    Active = u.Active,
                    SiteId = u.SiteId
                }).OrderBy(a => a.FirstName).ThenBy(a => a.LastName)
                .ToArray();
            return res;
        }


    }
}
