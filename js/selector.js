let vmData = [];

async function loadVmData() {
  const response = await fetch('data/azure_vms.json');
  vmData = await response.json();
}

function findBestMatch(cpu, memory, region) {
  let best = null;
  let bestScore = Infinity;

  for (const vm of vmData) {
    if (!vm.regions.includes(region)) continue;

    const cpuDiff = vm.vcpus - cpu;
    const memDiff = vm.memory_gb - memory;

    if (cpuDiff >= 0 && memDiff >= 0) {
      const score = cpuDiff + memDiff;
      if (score < bestScore) {
        bestScore = score;
        best = vm;
      }
    }
  }
  return best;
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadVmData();
  const form = document.getElementById('vmForm');
  const resultDiv = document.getElementById('result');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const cpu = parseFloat(form.vcpu.value);
    const memory = parseFloat(form.memory.value);
    const region = form.region.value.trim().toLowerCase();

    const match = findBestMatch(cpu, memory, region);
    if (match) {
      resultDiv.textContent = `Suggested size: ${match.name} - ${match.vcpus} vCPUs, ${match.memory_gb} GB RAM`;
    } else {
      resultDiv.textContent = 'No matching VM size found.';
    }
  });
});
