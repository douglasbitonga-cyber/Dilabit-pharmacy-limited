# -*- mode: python ; coding: utf-8 -*-

block_cipher = None

a = Analysis(
    ['pos_app.py'],
    pathex=[],
    binaries=[],
    datas=[
        ('pharmacy_pos.db', '.'),  # Bundles initial template SQLite database
    ],
    hiddenimports=[
        'pyside6',
        'flask',
        'requests',
        'cryptography',
        'escpos',
        'reportlab'
    ],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
    noarchive=False,
)

pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name='Dilabit_Pharmacy_POS',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=False,  # Set to False so command prompt window does not appear on launch
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon='app_icon.ico'  # Optional icon file in root directory
)

coll = COLLECT(
    exe,
    a.binaries,
    a.zipfiles,
    a.datas,
    strip=False,
    upx=True,
    upx_exclude=[],
    name='Dilabit_Pharmacy_POS'
)
