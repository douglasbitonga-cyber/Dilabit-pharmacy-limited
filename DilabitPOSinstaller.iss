; Inno Setup Script for Dilabit Pharmacy POS
#define MyAppName "Dilabit Pharmacy POS"
#define MyAppPublisher "Dilabit Pharmacy Limited"
#define MyAppURL "https://dilabitpharmacy.co.ke"
#define MyAppExeName "Dilabit_Pharmacy_POS.exe"

; Allow version to be passed from the build system, default to 1.0.0
#ifdef MyAppVersion
  #define AppVersion MyAppVersion
#else
  #define AppVersion "1.0.0"
#endif

[Setup]
AppId={{D3F9B2C1-8E41-4190-9A31-8B61C80221FE}}
AppName={#MyAppName}
AppVersion={#AppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={autopf}\Dilabit Pharmacy POS
DisableProgramGroupPage=yes
OutputDir=Output
OutputBaseFilename=Dilabit_Pharmacy_POS_Setup_v{#AppVersion}
SetupIconFile=app_icon.ico
Compression=lzma2/ultra64
SolidCompression=yes
WizardStyle=modern

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked

[Files]
; Takes the PyInstaller output directory created during the build step
Source: "dist\Dilabit_Pharmacy_POS\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{autoprograms}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{autedesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent