USE [Rent]
GO
/****** Object:  Table [dbo].[Manager]    Script Date: 2018/1/25 下午 10:56:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Manager](
	[BackerID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](20) NULL,
	[Account] [nvarchar](100) NULL,
	[Password] [nvarchar](255) NULL,
	[CreateDate] [datetime2](7) NULL,
	[CreateUser] [nvarchar](20) NULL,
	[ModifyDate] [datetime2](7) NULL,
	[ModifyUser] [nvarchar](20) NULL,
	[Status] [int] NULL,
	[Role] [int] NULL,
 CONSTRAINT [PK_Manager] PRIMARY KEY CLUSTERED 
(
	[BackerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PayFlow]    Script Date: 2018/1/25 下午 10:56:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PayFlow](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NULL,
	[PowerQty] [float] NULL,
	[Payment] [decimal](18, 0) NULL,
	[TimeOfPayment] [datetime2](7) NULL,
	[CreateUser] [nvarchar](20) NULL,
	[CreateDate] [datetime2](7) NULL,
	[ModifyUser] [nvarchar](20) NULL,
	[ModifyDate] [datetime2](7) NULL,
	[RoomNo] [nvarchar](20) NULL,
	[RentPeriod] [datetime2](7) NULL,
	[UsedPowerQty] [float] NULL,
 CONSTRAINT [PK_PayFlow] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RentDetail]    Script Date: 2018/1/25 下午 10:56:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RentDetail](
	[RoomID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NULL,
	[RoomNo] [nvarchar](20) NULL,
	[RentStartDate] [datetime2](7) NULL,
	[RentEndDate] [datetime2](7) NULL,
	[PowerUnitCost] [decimal](18, 0) NULL,
	[RentMonthly] [decimal](18, 0) NULL,
	[EnterDate] [datetime2](7) NULL,
	[LeaveDate] [datetime2](7) NULL,
	[Status] [int] NULL,
	[CreateUser] [nvarchar](20) NULL,
	[CreateDate] [datetime2](7) NULL,
	[ModifyUser] [nvarchar](20) NULL,
	[ModifyDate] [datetime2](7) NULL,
	[CalculateType] [int] NULL,
 CONSTRAINT [PK_RentDetail] PRIMARY KEY CLUSTERED 
(
	[RoomID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserDetail]    Script Date: 2018/1/25 下午 10:56:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserDetail](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](20) NULL,
	[Birth] [date] NULL,
	[IDCardNo] [nvarchar](20) NULL,
	[Phone] [nvarchar](20) NULL,
	[Career] [nvarchar](50) NULL,
	[Address] [nvarchar](100) NULL,
	[LineID] [nvarchar](50) NULL,
	[CreateUser] [nvarchar](20) NULL,
	[CreateDate] [datetime2](7) NULL,
	[ModifyUser] [nvarchar](20) NULL,
	[ModifyDate] [datetime2](7) NULL,
	[ContactUser] [nvarchar](20) NULL,
	[ContactUserPhone] [nvarchar](20) NULL,
	[Sex] [nvarchar](2) NULL,
	[CalculateType] [int] NULL,
	[TVCost] [int] NULL,
	[Status] [int] NULL,
 CONSTRAINT [PK_UserDetail] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'1:最高權限啥都行
2.能按繳費功能
3.能新增編輯資料
4.僅能查看' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Manager', @level2type=N'COLUMN',@level2name=N'Role'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'當前電力度數' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'PayFlow', @level2type=N'COLUMN',@level2name=N'PowerQty'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0:搬離,1:入住中' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'RentDetail', @level2type=N'COLUMN',@level2name=N'Status'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'1:正常繳、2:六個月躉繳，扣一個月的1/4、3:加計有線電視費用' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'UserDetail', @level2type=N'COLUMN',@level2name=N'CalculateType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0:搬離,1:入住中' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'UserDetail', @level2type=N'COLUMN',@level2name=N'Status'
GO
