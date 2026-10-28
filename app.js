const input = document.getElementById('urlInput');
const statusEl = document.getElementById('status');
const result = document.getElementById('result');
const providerEl = document.getElementById('provider');
const resultUrl = document.getElementById('resultUrl');
const formatStatus = document.getElementById('formatStatus');
const openSource = document.getElementById('openSource');

document.getElementById('year').textContent = new Date().getFullYear();

function setStatus(message, isError=false) {
  statusEl.textContent = message;
  statusEl.style.color = isError ? '#ffaaa9' : '';
}
function normalizeUrl(raw) {
  const value = raw.trim();
  if (!value) throw new Error('আগে ভিডিও লিংক পেস্ট করুন।');
  let parsed;
  try { parsed = new URL(value); } catch { throw new Error('সঠিক URL দিন, যেমন https://...'); }
  if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('শুধু HTTP/HTTPS লিংক ব্যবহার করা যাবে।');
  return parsed;
}
function providerName(hostname) {
  const h = hostname.toLowerCase().replace(/^www\./,'').replace(/^m\./,'');
  if (h === 'youtu.be' || h.endsWith('youtube.com')) return 'YouTube';
  if (h === 'tiktok.com' || h.endsWith('.tiktok.com')) return 'TikTok';
  if (h === 'instagram.com' || h.endsWith('.instagram.com')) return 'Instagram';
  if (h === 'facebook.com' || h.endsWith('.facebook.com') || h === 'fb.watch') return 'Facebook';
  if (h === 'pinterest.com' || h.endsWith('.pinterest.com') || h === 'pin.it') return 'Pinterest';
  return 'সাধারণ URL';
}
async function pasteClipboard() {
  try {
    if (!navigator.clipboard || !navigator.clipboard.readText) {
      throw new Error('এই ব্রাউজারে Clipboard API পাওয়া যায়নি। বক্সে ট্যাপ করে Paste করুন।');
    }
    const text = await navigator.clipboard.readText();
    if (!text.trim()) throw new Error('ক্লিপবোর্ডে কোনো টেক্সট নেই। আগে ভিডিও লিংক কপি করুন।');
    input.value = text.trim();
    setStatus('কপি করা টেক্সট বসানো হয়েছে। এখন “লিংক যাচাই করুন” চাপুন।');
    inspectLink(false);
  } catch (e) {
    setStatus((e && e.message) || 'Clipboard পড়া যায়নি। বক্সে নিজে Paste করুন।', true);
    input.focus();
  }
}
function inspectLink(updateStatus=true) {
  try {
    const url = normalizeUrl(input.value);
    const provider = providerName(url.hostname);
    providerEl.textContent = provider;
    resultUrl.textContent = url.href;
    openSource.href = url.href;
    result.classList.remove('hidden');
    formatStatus.textContent = 'ফরম্যাট বাছাই করলে এই ডেমোতে API সংযোগের প্রয়োজন দেখানো হবে।';
    if (updateStatus) setStatus('লিংকটি সঠিক URL হিসেবে শনাক্ত হয়েছে।');
    result.scrollIntoView({behavior:'smooth', block:'nearest'});
  } catch (e) {
    result.classList.add('hidden');
    setStatus(e.message || 'লিংক যাচাই করা যায়নি।', true);
  }
}
document.getElementById('pasteBtn').addEventListener('click', pasteClipboard);
document.getElementById('checkBtn').addEventListener('click', () => inspectLink(true));
document.getElementById('clearBtn').addEventListener('click', () => {
  input.value = '';
  result.classList.add('hidden');
  formatStatus.textContent = '';
  setStatus('লিংক মুছে ফেলা হয়েছে।');
  input.focus();
});
input.addEventListener('paste', () => setTimeout(() => inspectLink(false), 80));
input.addEventListener('keydown', e => { if (e.key === 'Enter') inspectLink(true); });
document.querySelectorAll('.format-card').forEach(card => {
  card.addEventListener('click', () => {
    formatStatus.textContent = `${card.dataset.format}: প্রকৃত ফাইল লিংক পেতে অনুমোদিত API/Backend যুক্ত করতে হবে। এই সংস্করণ কোনো ভুয়া ডাউনলোড শুরু করে না।`;
  });
});

// Clipboard access is deliberately user-triggered; browsers generally block silent clipboard reads.
document.getElementById('langBtn').addEventListener('click', () => {
  alert('English interface can be added in a later version. / পরবর্তী সংস্করণে সম্পূর্ণ English UI যোগ করা যাবে।');
});
