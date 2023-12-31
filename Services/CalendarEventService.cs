﻿using Microsoft.EntityFrameworkCore;
using Models;
using Models.Context;
using Models.Dto;
using Services.Data;
using Services.Helpers;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class CalendarEventService : ICalendarEventService
    {
        private ApplicationDbContext _context;
        public CalendarEventService(ApplicationDbContext context)
        {
            _context = context;
        }

        private int ConvertTime(string timeStr)
        {
            return 0;
        }

        public async Task<EventListRow[]> GetFilteredEvents(EventListFilter filter)
        {
            var query = _context.CalendarEvents.Where(evt =>
                 (filter.DateFrom.HasValue && evt.Date > filter.DateFrom.Value)
                 && (filter.DateTo.HasValue && evt.Date < filter.DateTo.Value)
                 && (string.IsNullOrEmpty(filter.Title) || evt.Name.Contains(filter.Title))
                 && (filter.TimeFrom == null || evt.StartTime > filter.TimeFrom.ToInt())
                 && (filter.TimeTo == null || evt.EndTime > filter.TimeTo.ToInt())
                 && (filter.Chapters == null || filter.Chapters.Length == 0 || filter.Chapters.Contains(evt.Site.Id))
                 && (!filter.Status.HasValue || (int)filter.Status.Value == evt.Status)
                 && (!filter.Status.HasValue || (int)filter.Status.Value == evt.Status)
                 && (!filter.TypeOfEvent.HasValue || filter.TypeOfEvent.Value == evt.EventTypeId)
                 && evt.Status != (int)EventStatus.Deleted
            ).Include(evt => evt.Site).Include(evt => evt.EventType).Take(1000).Select(evt => new EventListRow() { Name = evt.Name, Chapter = evt.Site.Name, Color = evt.EventType.Color, Date = evt.Date.ToString("d"), Id = evt.Id, Status = (EventStatus)evt.Status, Time = $"{Converters.IntTimeToStr(evt.StartTime)} - {Converters.IntTimeToStr(evt.EndTime)}", Type = evt.EventType.Title });
            
            return await query.ToArrayAsync();
        }

        public Contact AddContact(Contact contact)
        {
            var res = _context.Contacts.Add(contact);
            _context.SaveChanges();
            return res.Entity;
        }

        public CalendarEventType AddEventType(CalendarEventType evType)
        {
            var res = _context.CalendarEventTypes.Add(evType);
            _context.SaveChanges();
            return res.Entity;
        }

        public EventSite AddEventSite(EventSite site)
        {
            var res = _context.EventSites.Add(site);
            _context.SaveChanges();
            return res.Entity;
        }

        public Contact GetContactByEmail(string email)
        {
            return _context.Contacts.FirstOrDefault(a => a.Email == email);
        }

        public CalendarEvent AddEvent(CalendarEvent newEvent)
        {
            var res =_context.CalendarEvents.Add(newEvent);
            _context.SaveChanges();
            return res.Entity;
        }

        public EventSite GetEventSite(int id)
        {
            return _context.EventSites.FirstOrDefault(a => a.OldId == id);
        }

        public CalendarEventType[] AllEventTypes()
        {
            return _context.CalendarEventTypes.ToArray();
        }

        public AspNetUser GetUserByOldId(int id)
        {
            return _context.AspNetUsers.FirstOrDefault(a => a.OldId == id);
        }

        private EventView RawToView(CalendarEvent evt)
        {
            var res = new EventView();
            res.Id = evt.Id;
            res.Am = evt.StartTime < 1200;
            res.Hours = res.Am? evt.StartTime / 100 : (evt.StartTime / 100) -12;
            if (res.Hours == 0 && !res.Am)
                res.Hours = 12;
            res.Minutes = evt.StartTime % 100;
            res.Name = evt.Name;
            res.Color = evt.EventType.Color;
            return res;
        }

        public CalendarView[] GetMonthEvents(CalendarViewFilter filter)
        {
            DateTime start = new DateTime(filter.Year, filter.Month, 1);
            DateTime end = start.AddMonths(1);
            CalendarEvent[] events;
            if (filter.Sites != null && filter.Sites.Length > 0)
            {
                events = _context.CalendarEvents.Include(a => a.EventType).Where(e => e.Date >= start && e.Date < end && filter.Sites.Contains(e.Site.Id) && e.Status != (int)EventStatus.Deleted).OrderBy(a => a.Date).ThenBy(a => a.StartTime).ToArray();
            }
            else
            {
                events = _context.CalendarEvents.Include(a=>a.EventType).Where(e => e.Date >= start && e.Date < end && e.Status != (int)EventStatus.Deleted).OrderBy(a => a.Date).ThenBy(a => a.StartTime).ToArray();
            }
            return (from e in events
                          group e by $"{e.Date.Month}-{e.Date.Day}" into ge
                          select new CalendarView (){ Day = ge.Key, Events = ge.Select(a=>RawToView(a)).ToArray() }).ToArray();

        }
    }
}
