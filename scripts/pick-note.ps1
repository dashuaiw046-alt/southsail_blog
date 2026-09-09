param(
  [Parameter(Mandatory = $true)]
  [ValidateSet("files", "module")]
  [string]$Action
)

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

function Show-FilePicker {
  $dialog = New-Object System.Windows.Forms.OpenFileDialog
  $dialog.Title = "Select Markdown notes"
  $dialog.Filter = "Markdown (*.md;*.mdx)|*.md;*.mdx|All files (*.*)|*.*"
  $dialog.Multiselect = $true
  $dialog.CheckFileExists = $true

  $start = Join-Path $env:USERPROFILE "Documents"
  if (Test-Path $start) {
    $dialog.InitialDirectory = $start
  }

  $result = $dialog.ShowDialog()
  if ($result -ne [System.Windows.Forms.DialogResult]::OK) {
    exit 2
  }

  $payload = @{ files = @($dialog.FileNames) }
  $payload | ConvertTo-Json -Compress
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

  $result = $form.ShowDialog()
  if ($result -ne [System.Windows.Forms.DialogResult]::OK) {
    exit 2
  }

  $type = if ($ctf.Checked) { "ctf" } else { "articles" }
  @{ type = $type } | ConvertTo-Json -Compress
}

if ($Action -eq "files") {
  Show-FilePicker
} else {
  Show-ModulePicker
}
