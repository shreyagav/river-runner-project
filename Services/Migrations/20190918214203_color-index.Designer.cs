﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Services.Data;

namespace Services.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20190918214203_color-index")]
    partial class colorindex
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.3-servicing-35854")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("Models.BudgetLine", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal>("Cost");

                    b.Property<string>("Description");

                    b.Property<int>("EventId");

                    b.Property<string>("Name");

                    b.Property<decimal>("Quantity");

                    b.HasKey("Id");

                    b.HasIndex("EventId");

                    b.ToTable("EventBudgets");
                });

            modelBuilder.Entity("Models.CalendarEvent", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Attended");

                    b.Property<DateTime?>("Canceled");

                    b.Property<string>("Color");

                    b.Property<DateTime>("Created");

                    b.Property<string>("CreatedById");

                    b.Property<DateTime>("Date");

                    b.Property<DateTime?>("Deleted");

                    b.Property<string>("Description");

                    b.Property<int>("EndTime");

                    b.Property<int>("EventTypeId");

                    b.Property<decimal>("Fee");

                    b.Property<int>("GroupId");

                    b.Property<int>("MaxCapacity");

                    b.Property<DateTime>("Modified");

                    b.Property<string>("ModifiedById");

                    b.Property<string>("Name");

                    b.Property<int>("OldCreatedById");

                    b.Property<int>("OldEventCount");

                    b.Property<int>("OldEventMultiOrder");

                    b.Property<int>("OldEventRepeat");

                    b.Property<int>("OldEventSiteId");

                    b.Property<int>("OldEventTypeId");

                    b.Property<string>("OldEventVisibility")
                        .IsRequired()
                        .HasConversion(new ValueConverter<string, string>(v => default(string), v => default(string), new ConverterMappingHints(size: 1)));

                    b.Property<int>("OldId");

                    b.Property<int>("OldModifiedById");

                    b.Property<decimal>("ProjectedCost");

                    b.Property<string>("Report");

                    b.Property<int>("SiteId");

                    b.Property<int>("StartTime");

                    b.Property<int>("Status");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById");

                    b.HasIndex("EventTypeId");

                    b.HasIndex("ModifiedById");

                    b.HasIndex("SiteId");

                    b.ToTable("CalendarEvents");
                });

            modelBuilder.Entity("Models.CalendarEventType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Color");

                    b.Property<int>("OldId");

                    b.Property<byte>("Order");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.HasIndex("Order");

                    b.ToTable("CalendarEventTypes");
                });

            modelBuilder.Entity("Models.Contact", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email");

                    b.Property<string>("Name");

                    b.Property<string>("Phone");

                    b.HasKey("Id");

                    b.ToTable("Contacts");
                });

            modelBuilder.Entity("Models.Diagnosis", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<int>("OldId");

                    b.HasKey("Id");

                    b.ToTable("Diagnoses");
                });

            modelBuilder.Entity("Models.EventSite", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("AllowEverybody")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(false);

                    b.Property<int?>("CoordinatorId");

                    b.Property<string>("Description");

                    b.Property<int?>("GOVTId");

                    b.Property<int>("GroupId");

                    b.Property<string>("GroupName");

                    b.Property<int?>("MainId");

                    b.Property<string>("Name");

                    b.Property<int?>("NationalId");

                    b.Property<int>("OldId");

                    b.Property<DateTime?>("Originated")
                        .HasColumnType("Date");

                    b.Property<int?>("OutreachId");

                    b.Property<bool>("PoolRental");

                    b.Property<string>("SecurityClearance");

                    b.Property<int>("SiteGroupId");

                    b.Property<int>("SiteStatusId");

                    b.Property<int>("StaffTypeId");

                    b.Property<int>("TypeId");

                    b.HasKey("Id");

                    b.HasIndex("CoordinatorId");

                    b.HasIndex("GOVTId");

                    b.HasIndex("MainId");

                    b.HasIndex("NationalId");

                    b.HasIndex("OutreachId");

                    b.ToTable("EventSites");
                });

            modelBuilder.Entity("Models.Option", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<int>("OldId");

                    b.Property<int>("OptionCategoryId");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.HasIndex("OptionCategoryId");

                    b.ToTable("Options");
                });

            modelBuilder.Entity("Models.OptionCategory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.Property<int>("OldId");

                    b.HasKey("Id");

                    b.ToTable("OptionCategories");
                });

            modelBuilder.Entity("Models.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("EventId");

                    b.Property<string>("FileName");

                    b.Property<int>("Height");

                    b.Property<DateTime>("Uploaded");

                    b.Property<string>("Url");

                    b.Property<int>("Width");

                    b.HasKey("Id");

                    b.HasIndex("EventId");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("Models.SystemCode", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CodeType")
                        .HasMaxLength(2);

                    b.Property<string>("Description")
                        .HasMaxLength(50);

                    b.Property<int>("OldId");

                    b.HasKey("Id");

                    b.ToTable("SystemCodes");
                });

            modelBuilder.Entity("Models.TRRUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<bool>("Active");

                    b.Property<string>("Address");

                    b.Property<string>("AltPhone");

                    b.Property<int>("BranchId");

                    b.Property<string>("City");

                    b.Property<string>("Comments");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<DateTime?>("DateInjured")
                        .HasColumnType("Date");

                    b.Property<DateTime?>("DateOfBirth")
                        .HasColumnType("Date");

                    b.Property<string>("DeactiveCause");

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<string>("FirstName");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasConversion(new ValueConverter<string, string>(v => default(string), v => default(string), new ConverterMappingHints(size: 1)));

                    b.Property<DateTime?>("JoinDate")
                        .HasColumnType("Date");

                    b.Property<string>("LastName");

                    b.Property<bool>("LiabilitySigned");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<int>("Medical");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<int>("OldAuthLevel");

                    b.Property<int>("OldId");

                    b.Property<string>("OldLogin");

                    b.Property<string>("OldPassword");

                    b.Property<int>("OldSiteId");

                    b.Property<int>("OldSponsoredById");

                    b.Property<int>("OldStatus");

                    b.Property<int>("OldType");

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<bool>("ReleaseSigned");

                    b.Property<string>("SecurityStamp");

                    b.Property<int?>("SiteId");

                    b.Property<string>("SponsoredById");

                    b.Property<string>("State");

                    b.Property<string>("TravelTime");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.Property<string>("Zip");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.HasIndex("OldId")
                        .IsUnique();

                    b.HasIndex("SiteId");

                    b.HasIndex("SponsoredById");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("Models.UserDiagnosis", b =>
                {
                    b.Property<int>("DiagnosisId");

                    b.Property<string>("UserId");

                    b.Property<string>("Note");

                    b.HasKey("DiagnosisId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("UserDiagnoses");
                });

            modelBuilder.Entity("Models.UserEvent", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<int>("EventId");

                    b.Property<bool?>("Attended");

                    b.Property<string>("Comment");

                    b.Property<DateTime>("Created");

                    b.Property<string>("CreatedById");

                    b.Property<int?>("OldEventId");

                    b.Property<int?>("OldUserId");

                    b.HasKey("UserId", "EventId");

                    b.HasIndex("CreatedById");

                    b.HasIndex("EventId");

                    b.ToTable("UserEvents");
                });

            modelBuilder.Entity("Models.UserOption", b =>
                {
                    b.Property<int>("OptionId");

                    b.Property<string>("UserId");

                    b.Property<string>("Description");

                    b.HasKey("OptionId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("UserOptions");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Models.TRRUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Models.TRRUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Models.TRRUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Models.TRRUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Models.BudgetLine", b =>
                {
                    b.HasOne("Models.CalendarEvent", "Event")
                        .WithMany("Budget")
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Models.CalendarEvent", b =>
                {
                    b.HasOne("Models.TRRUser", "CreatedBy")
                        .WithMany()
                        .HasForeignKey("CreatedById");

                    b.HasOne("Models.CalendarEventType", "EventType")
                        .WithMany()
                        .HasForeignKey("EventTypeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Models.TRRUser", "ModifiedBy")
                        .WithMany()
                        .HasForeignKey("ModifiedById");

                    b.HasOne("Models.EventSite", "Site")
                        .WithMany()
                        .HasForeignKey("SiteId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Models.EventSite", b =>
                {
                    b.HasOne("Models.Contact", "Coordinator")
                        .WithMany()
                        .HasForeignKey("CoordinatorId");

                    b.HasOne("Models.Contact", "GOVT")
                        .WithMany()
                        .HasForeignKey("GOVTId");

                    b.HasOne("Models.Contact", "Main")
                        .WithMany()
                        .HasForeignKey("MainId");

                    b.HasOne("Models.Contact", "National")
                        .WithMany()
                        .HasForeignKey("NationalId");

                    b.HasOne("Models.Contact", "Outreach")
                        .WithMany()
                        .HasForeignKey("OutreachId");
                });

            modelBuilder.Entity("Models.Option", b =>
                {
                    b.HasOne("Models.OptionCategory", "Category")
                        .WithMany("Options")
                        .HasForeignKey("OptionCategoryId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Models.Photo", b =>
                {
                    b.HasOne("Models.CalendarEvent", "Event")
                        .WithMany()
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Models.TRRUser", b =>
                {
                    b.HasOne("Models.EventSite", "Site")
                        .WithMany()
                        .HasForeignKey("SiteId");

                    b.HasOne("Models.TRRUser", "SponsoredBy")
                        .WithMany()
                        .HasForeignKey("SponsoredById");
                });

            modelBuilder.Entity("Models.UserDiagnosis", b =>
                {
                    b.HasOne("Models.Diagnosis", "Diagnosis")
                        .WithMany("Users")
                        .HasForeignKey("DiagnosisId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Models.TRRUser", "User")
                        .WithMany("Diagnoses")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Models.UserEvent", b =>
                {
                    b.HasOne("Models.TRRUser", "CreatedBy")
                        .WithMany()
                        .HasForeignKey("CreatedById");

                    b.HasOne("Models.CalendarEvent", "Event")
                        .WithMany("Events")
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Models.TRRUser", "User")
                        .WithMany("Events")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Models.UserOption", b =>
                {
                    b.HasOne("Models.Option", "Option")
                        .WithMany("UserOptions")
                        .HasForeignKey("OptionId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Models.TRRUser", "User")
                        .WithMany("Options")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}