create table Contractor
(
	id char(36) not null
		primary key,
	firstName varchar(30) not null,
	surname varchar(50) not null,
	agencySource varchar(100) not null,
	status enum('active', 'inactive') default 'active' null,
	rehire bit default b'0' null,
	constraint Contractor_id_uindex
		unique (id)
)
;

create table CostCenter
(
	id char(36) not null
		primary key,
	Location varchar(150) not null
)
;

create table Currency
(
	code char(3) not null
		primary key,
	country varchar(30) not null
)
;

create table EngagementContract
(
	id char(36) not null
		primary key,
	startDate date null,
	endDate date null,
	rateType enum('monthly', 'hourly', 'daily') not null,
	projectName varchar(100) not null,
	chargeType enum('capital', 'opcost') not null,
	dailyAllowance int not null,
	originalDocumentation varchar(500) not null,
	terminationNum int null,
	contractorId char(36) not null,
	resourceId char(36) not null,
	hrPositionId char(36) not null,
	hrPayGradeId char(36) not null,
	costCenterId char(36) not null,
	reportingManagerUserId varchar(30) null,
	currencyCode char(3) not null,
	mainSkillId char(36) not null,
	timeAndMaterialTerms int default '0' null,
	poNum int default '1' null,
	hourlyRate int default '0' null,
	constraint EngagementContract_id_uindex
		unique (id),
	constraint EngagementContract_Contractor_id_fk
		foreign key (contractorId) references Contractor (id),
	constraint EngagementContract_CostCenter_id_fk
		foreign key (costCenterId) references CostCenter (id),
	constraint EngagementContract_Currency_code_fk
		foreign key (currencyCode) references Currency (code)
)
;

create index EngagementContract_Contractor_id_fk
	on EngagementContract (contractorId)
;

create index EngagementContract_CostCenter_id_fk
	on EngagementContract (costCenterId)
;

create index EngagementContract_Currency_code_fk
	on EngagementContract (currencyCode)
;

create index EngagementContract_HRPayGrade_id_fk
	on EngagementContract (hrPayGradeId)
;

create index EngagementContract_HRPositionRole_id_fk
	on EngagementContract (hrPositionId)
;

create index EngagementContract_ResourceProvided_id_fk
	on EngagementContract (resourceId)
;

create index EngagementContract_User_username_fk
	on EngagementContract (reportingManagerUserId)
;

create index EngagementContract_Skill_id_fk
	on EngagementContract (mainSkillId)
;

create table FXRate
(
	curCode1 char(3) not null,
	curCode2 char(3) not null,
	rate double not null,
	primary key (curCode1, curCode2)
)
;

create table HRPayGrade
(
	id char(36) not null
		primary key,
	startAmount int null,
	endAmount int null,
	name varchar(4) null,
	constraint HRPayGrade_id_uindex
		unique (id)
)
;

alter table EngagementContract
	add constraint EngagementContract_HRPayGrade_id_fk
		foreign key (hrPayGradeId) references HRPayGrade (id)
;

create table HRPositionRole
(
	id char(36) not null
		primary key,
	roleName varchar(50) not null,
	description varchar(1000) null,
	constraint HRPositionRole_id_uindex
		unique (id)
)
;

alter table EngagementContract
	add constraint EngagementContract_HRPositionRole_id_fk
		foreign key (hrPositionId) references HRPositionRole (id)
;

create table HiringManager
(
	userId varchar(36) not null
		primary key,
	firstName varchar(30) null,
	lastName varchar(30) null
)
;

create table Login
(
	username varchar(36) not null
		primary key,
	token varchar(36) not null,
	timestamp datetime null,
	constraint logins_username_uindex
		unique (username),
	constraint logins_token_uindex
		unique (token)
)
;

create table ResourceProvided
(
	id char(36) not null
		primary key,
	engagementId char(36) null,
	phone bit null,
	remoteToken bit null,
	buildingPass bit null,
	notebook bit null,
	deskLocation varchar(10) null,
	others varchar(50) null,
	constraint ResourceProvided_id_uindex
		unique (id),
	constraint ResourceProvided_EngagementContract_id_fk
		foreign key (engagementId) references EngagementContract (id)
)
;

create index ResourceProvided_EngagementContract_id_fk
	on ResourceProvided (engagementId)
;

create table Skill
(
	id char(36) not null
		primary key,
	name varchar(100) not null,
	type varchar(50) not null,
	description varchar(200) not null,
	constraint Skill_skillId_uindex
		unique (id),
	constraint Skill_name_uindex
		unique (name)
)
;

alter table EngagementContract
	add constraint EngagementContract_Skill_id_fk
		foreign key (mainSkillId) references Skill (id)
;

create table SkillProvided
(
	contractorId char(36) not null,
	skillId char(36) not null,
	primary key (contractorId, skillId)
)
;

create table User
(
	username varchar(36) not null
		primary key,
	password varchar(200) not null,
	permissions enum('none', 'read', 'write', 'admin', 'super-admin') not null,
	constraint User_username_uindex
		unique (username)
)
;

alter table EngagementContract
	add constraint EngagementContract_User_username_fk
		foreign key (reportingManagerUserId) references User (username)
;

INSERT into FXRate(curCode1, curCode2, rate) VALUES ('CAD', 'USD',  0.78);

INSERT into User(username, password, permissions) VALUES ('admin', 'admin', 'admin');

