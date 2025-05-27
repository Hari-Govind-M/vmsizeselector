# Azure VM Size Selector

This is a simple web application that suggests an Azure VM size based on the number of vCPUs, amount of memory, and deployment region specified by the user.

## Running the app

Serve the contents of this repository with any static web server. For example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/index.html` in your browser.

## Editing the VM data

The list of available VM sizes is stored in `data/azure_vms.json`. Update this file to add or modify VM offerings.

The matching logic resides in `js/selector.js`.
