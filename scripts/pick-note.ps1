param(
  [Parameter(Mandatory = $true)]
  [ValidateSet("files", "module")]
  [string]$Action,

  [string]$OutFile
)

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

function Write-Result($object) {
  $json = $object | ConvertTo-Json -Compress -Depth 5
  if ($OutFile) {
    $parent = Split-Path -Parent $OutFile
    if ($parent -and -not (Test-Path -LiteralPath $parent)) {
      New-Item -ItemType Directory -Path $parent -Force | Out-Null
    }
    $utf8 = New-Object System.Text.UTF8Encoding $false
    [System.IO.File]::WriteAllText($OutFile, $json, $utf8)
  } else {
    Write-Output $json
  }
}

function New-OwnerForm {
  $owner = New-Object System.Windows.Forms.Form
  $owner.Text = "southsail"
  $owner.TopMost = $true
  $owner.ShowInTaskbar = $false
  $owner.FormBorderStyle = "FixedToolWindow"
  $owner.StartPosition = "Manual"
  $owner.Size = New-Object System.Drawing.Size(1, 1)
  $owner.Location = New-Object System.Drawing.Point(-4000, -4000)
  $owner.Show()
  $owner.Activate()
  return $owner
}

function Show-FilePicker {
  $dialog = New-Object System.Windows.Forms.OpenFileDialog
  $dialog.Title = "southsail — 选择 Markdown 笔记"
  $dialog.Filter = "Markdown (*.md;*.mdx)|*.md;*.mdx|All files (*.*)|*.*"
  $dialog.Multiselect = $true
  $dialog.CheckFileExists = $true

  $start = Join-Path $env:USERPROFILE "Documents"
  if (Test-Path $start) {
    $dialog.InitialDirectory = $start
  }

  $owner = New-OwnerForm
  try {
    $result = $dialog.ShowDialog($owner)
  } finally {
    $owner.Close()
    $owner.Dispose()
  }

  if ($result -ne [System.Windows.Forms.DialogResult]::OK) {
    exit 2
  }

  Write-Result @{ files = @($dialog.FileNames) }
}

function Show-ModulePicker {
  $form = New-Object System.Windows.Forms.Form
  $form.Text = "Publish to"
  $form.Size = New-Object System.Drawing.Size(380, 220)
  $form.StartPosition = "CenterScreen"
  $form.FormBorderStyle = "FixedDialog"
  $form.MaximizeBox = $false
  $form.MinimizeBox = $false
  $form.TopMost = $true
  $form.ShowInTaskbar = $true

  $label = New-Object System.Windows.Forms.Label
  $label.Text = "Choose a section for the selected files:"
  $label.AutoSize = $true
  $label.Location = New-Object System.Drawing.Point(20, 18)

  $article = New-Object System.Windows.Forms.RadioButton
  $article.Text = "Articles    /articles"
  $article.Location = New-Object System.Drawing.Point(24, 52)
  $article.Size = New-Object System.Drawing.Size(320, 24)
  $article.Checked = $true

  $ctf = New-Object System.Windows.Forms.RadioButton
  $ctf.Text = "CTF         /ctf"
  $ctf.Location = New-Object System.Drawing.Point(24, 82)
  $ctf.Size = New-Object System.Drawing.Size(320, 24)

  $ok = New-Object System.Windows.Forms.Button
  $ok.Text = "Publish"
  $ok.Location = New-Object System.Drawing.Point(160, 130)
  $ok.DialogResult = [System.Windows.Forms.DialogResult]::OK

  $cancel = New-Object System.Windows.Forms.Button
  $cancel.Text = "Cancel"
  $cancel.Location = New-Object System.Drawing.Point(250, 130)
  $cancel.DialogResult = [System.Windows.Forms.DialogResult]::Cancel

  $form.AcceptButton = $ok
  $form.CancelButton = $cancel
  $form.Controls.AddRange(@($label, $article, $ctf, $ok, $cancel)) | Out-Null

  $owner = New-OwnerForm
  try {
    $form.Owner = $owner
    $result = $form.ShowDialog($owner)
  } finally {
    $owner.Close()
    $owner.Dispose()
  }
  if ($result -ne [System.Windows.Forms.DialogResult]::OK) {
    exit 2
  }

  $type = if ($ctf.Checked) { "ctf" } else { "articles" }
  Write-Result @{ type = $type }
}

try {
  if ($Action -eq "files") {
    Show-FilePicker
  } else {
    Show-ModulePicker
  }
} catch {
  $message = $_.Exception.Message
  if ($OutFile) {
    Write-Result @{ error = $message }
  }
  [Console]::Error.WriteLine($message)
  exit 1
}
