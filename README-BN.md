# SM Video Downloader (GitHub Pages starter)

এটি একটি responsive frontend starter। এতে আছে:
- Pinterest, YouTube, TikTok, Facebook ও Instagram URL শনাক্তকরণ
- ব্যবহারকারীর বোতাম চাপে Clipboard API দিয়ে Paste করার চেষ্টা
- ম্যানুয়াল Paste/URL input
- HD, SD, MP4, MP3 অপশনের UI placeholder
- iPhone ও laptop-এর জন্য responsive layout

## গুরুত্বপূর্ণ সীমাবদ্ধতা
এই প্রকল্প এখনো প্রকৃত social-media downloader নয়। এটি URL যাচাই করে এবং কোন প্ল্যাটফর্মের লিংক তা শনাক্ত করে। ভিডিও পেজের URL থেকে সরাসরি আসল media file বা HD/SD/MP3 URL পাওয়া যায় না। প্রকৃত ফিচারের জন্য প্ল্যাটফর্মের অনুমোদিত API/অ্যাক্সেস এবং নিরাপদ backend দরকার। GitHub Pages শুধু static hosting, এখানে server-side secret রাখা যাবে না।

অন্যের কপিরাইটযুক্ত ভিডিও, DRM, login wall, private content বা প্ল্যাটফর্মের নিরাপত্তা সীমা পাশ কাটানোর জন্য ব্যবহার করবেন না। শুধু নিজের বা অনুমতিপ্রাপ্ত কনটেন্টে ব্যবহার করুন।

## GitHub Pages-এ প্রকাশ (iPhone বা laptop)
1. ZIP extract করুন।
2. GitHub-এ নতুন repository বানান, যেমন `sm-video-downloader`।
3. `index.html`, `style.css`, `app.js`, `README-BN.md` ফাইলগুলো repository root-এ upload করুন।
4. Repository → **Settings** → **Pages** খুলুন।
5. **Deploy from a branch** বেছে নিন।
6. Branch `main` এবং folder `/ (root)` নির্বাচন করে **Save** চাপুন।
7. কিছুক্ষণ পর Pages-এর দেখানো URL খুলুন।

## Clipboard
Clipboard API সাধারণত HTTPS ও ব্যবহারকারীর স্পষ্ট action চায়। তাই ওয়েবসাইট খুললেই নীরবে clipboard পড়ার চেষ্টা করা হয়নি; Paste বোতামে চাপলে পড়ার চেষ্টা হয়, না হলে input box-এ long-press করে Paste করুন।

## পরবর্তী বাস্তব উন্নয়ন
- API/Backend নির্বাচন এবং প্রতিটি প্ল্যাটফর্মের নিয়ম যাচাই
- Server-side validation, rate limiting, abuse protection
- অনুমোদিত direct media URL থাকলে format list দেখানো
- শুধু অনুমতিপ্রাপ্ত media-র MP4/MP3 processing
- privacy notice, terms, error handling
