﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.Dto;
using Services.Interfaces;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalendarController : ControllerBase
    {
        private readonly ICalendarEventService _service;
        public CalendarController(ICalendarEventService service)
        {
            _service = service;
        }
        [HttpPost]
        [Route("[action]")]
        public CalendarView[] GetMonthEvents(CalendarViewFilter filter)
        {
            return _service.GetMonthEvents(filter);
        }
        [HttpPost("[action]")]
        public async Task<EventListRow[]> GetFilteredList(EventListFilter filter)
        {
            return await _service.GetFilteredEvents(filter);
        }

    }
}