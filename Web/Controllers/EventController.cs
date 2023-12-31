﻿using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models.Context;
using Models.Dto;
using Services.Interfaces;

namespace Web.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventService _service;
        private readonly IStorageService _storageService;
        private readonly IMailService _mailService;
        public EventController(IEventService service, IStorageService storageService, IMailService mailService)
        {
            _service = service;
            _storageService = storageService;
            _mailService = mailService;
        }
        [HttpPost("[action]")]
        public  dynamic ToggleAttendance(ToggleAttendanceDto dto)
        {

            return _service.ToggleAttendance(dto);
        }

        
        [HttpPost("[action]")]
        public async Task<EventMainDto> ChangeEvent(EventMainDto evnt)
        {
            return await _service.ChangeEvent(evnt, User);
        }
        [HttpGet("[action]/{id}")]
        public async Task<EventMainDto> GetEventById(int id)
        {
            return await _service.GetEvent(id,User);
        }
        [Authorize]
        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> Attend(int id)
        {
            try {
                await _service.AddEventAttendees(id, User);
                var evt = await GetEventById(id);
                return Ok(evt);
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = ex.Message});
            }

        }
        [Authorize]
        [HttpGet("[action]/{id}")]
        public async Task<EventMainDto> UnAttend(int id)
        {
            await _service.RemoveEventAttendees(id, User);
            return await GetEventById(id);
        }
        //[Authorize(Roles = "Admin, Secretary")]
        [HttpGet("[action]/{id}")]
        public EventAttendeeDto[] GetEventAttendees(int id)
        {
            return _service.GetEventAttendees(id);
        }

        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> Photo(int id)
        {
            Photo p = _service.GetPhotoById(id);
            byte[] data = await _storageService.GetFile(Path.GetFileName(p.Url));
            return File(data, "application/octet-stream");
        }

        [HttpGet("[action]/{id}")]
        public Photo[] GetEventPhotos(int id)
        {
            var temp = _service.GetEventPhotos(id);
            foreach(var a in temp)
            {
                a.Url = $"/api/Event/Photo/{a.Id}";
            }
            return temp;
        }
        [HttpPost("[action]/{id}")]
        public async Task<Photo[]> UploadFile(int id, List<IFormFile> files)
        {
            List<Photo> photos = new List<Photo>(); 
            foreach (var f in files)
            {
                string url = await _storageService.SaveFile(Guid.NewGuid().ToString(), f.OpenReadStream());
                Image img = Image.FromStream(f.OpenReadStream());
                photos.Add(new Photo()
                {
                    EventId=id,
                    FileName=f.FileName,
                    Uploaded = DateTime.Now,
                    Width = img.Width,
                    Height = img.Height,
                    Url = url
                });
            }
            var arr = photos.ToArray();
            _service.AddPhotos(arr);
            foreach(var a in arr)
            {
                a.Url = $"/api/Event/Photo/{a.Id}";
            }
            return arr;
        }
        [HttpPost("[action]/{id}")]
        public EventAttendeeDto[] RemoveEventAttendees(int id, EventAttendeeDto attendee)
        {
            return _service.RemoveEventAttendees(id, attendee);
        }
        [HttpPost("[action]/{id}")]
        public async Task<EventAttendeeDto[]> AddEventAttendees(int id, string[] ids)
        {
            return await _service.AddEventAttendees(id, ids.Distinct<string>().ToArray(), User);
        }
        [HttpGet("[action]/{id}")]
        public EventAttendeeDto[] GetSiteMembers(int id)
        {
            return _service.GetSiteMembers(id);
        }
        [HttpGet("[action]/{id}")]
        public EventAttendeeDto[] GetSiteMembersOnly(int id)
        {
            return _service.GetSiteMembersOnly(id);
        }
        [HttpGet("[action]/{id}")]
        public EventBudget[] GetBudget(int id)
        {
            return _service.GetEventBudget(id);
        }
        [HttpPost("[action]/{id}")]
        public EventBudget[] AddBudgetLines(int id, EventBudget[] lines)
        {
            return _service.AddBudgetLines(id, lines);
        }

        [HttpPost("[action]/{id}")]
        public EventBudget[] AddBudgetLine(int id, EventBudget line)
        {
            EventBudget[] arr = new EventBudget[] { line };
            return _service.AddBudgetLines(id, arr);
        }

        [HttpPost("[action]/{id}")]
        public EventBudget[] UpdateBudgetLine(int id, EventBudget line)
        {
            
            return _service.UpdateBudgetLine(id, line);
        }

        [HttpPost("[action]/{id}")]
        public EventBudget[] DeleteBudgetLine(int id, EventBudget line)
        {
            return _service.DeleteBudgetLine(id, line);
        }
    }
}