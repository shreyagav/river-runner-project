﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Old
{
    public class Photo
    {
        public int Id { get; set; }
        public int EventId { get; set; }
        public Models.Context.CalendarEvent Event { get; set; }
        public string FileName { get; set; }
        public DateTime Uploaded { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public string Url { get; set; }
    }
}
