@echo off
set "PATH=C:\Windows\System32;C:\Windows;C:\Windows\System32\WindowsPowerShell\v1.0;C:\Windows\System32\OpenSSH;%PATH%"
set "ComSpec=C:\Windows\System32\cmd.exe"
C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe -NoProfile -ExecutionPolicy Bypass %*
