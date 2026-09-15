$userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
$sysPrefix = "C:\Windows\System32;C:\Windows;C:\Windows\System32\Wbem;C:\Windows\System32\WindowsPowerShell\v1.0\;C:\Windows\System32\OpenSSH\;"

if ($userPath -notlike "*System32*") {
    $updated = $sysPrefix + $userPath
    [Environment]::SetEnvironmentVariable('Path', $updated, 'User')
    Write-Output "SUCCESS: Added System32 paths to User Environment Path."
} else {
    Write-Output "User Environment Path already contains System32."
}

$final = [Environment]::GetEnvironmentVariable('Path', 'User')
Write-Output "Current User Path: $final"
