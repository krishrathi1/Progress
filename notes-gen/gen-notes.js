const fs = require('fs');
const path = require('path');

// Load environment variables from .env
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        let val = match[2] || '';
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
        process.env[match[1]] = val;
      }
    });
  }
}
loadEnv();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('Error: GEMINI_API_KEY not found in environment or .env file.');
  console.log('Please add GEMINI_API_KEY="your-key-here" to your .env file in the project root.');
  process.exit(1);
}

const topicsFile = path.join(__dirname, 'topics.json');
if (!fs.existsSync(topicsFile)) {
  console.error('Error: topics.json not found inside notes-gen/ directory.');
  console.log('Please run prep2.cjs first to generate the topics list: node notes-gen/prep2.cjs');
  process.exit(1);
}

const remainingTopics = JSON.parse(fs.readFileSync(topicsFile, 'utf8'));
console.log(`Loaded ${remainingTopics.length} remaining topics to generate.`);

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function generateNotesForTopic(topic) {
  const prompt = `You are a world-class technical educator. Write a highly detailed, clear, and comprehensive learning note for the following study topic:

Topic Name: "${topic.name}"
Subject Track: "${topic.subjectName}" (${topic.short})
Section: "${topic.section}"
Difficulty: "${topic.difficulty || 'General'}"

Instructions:
1. Explain the core concept in simple, easy-to-understand terms. Avoid overly complex jargon initially. Use analogies if helpful.
2. Provide a step-by-step breakdown or dry run of how it works.
3. Include high-quality code implementations (in Java/JavaScript/SQL/Pseudocode depending on track context) with syntax-highlighted code blocks.
4. For DSA or algorithms, detail the Time Complexity and Space Complexity (Best, Average, Worst case) using tables or bullet points.
5. Keep formatting clean and readable using standard Markdown (headers, bold text, bullet points, blockquotes, tables).
6. Do NOT include the topic name as a top-level H1 header (e.g., # TopicName) because the app UI already displays it. Start directly with explanations or H2 subheadings.

Format your entire response strictly as Markdown. Do not enclose it in an outer markdown code block wrapper (like \`\`\`markdown).`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('Invalid response structure received from Gemini API.');
  }

  return text.trim();
}

async function run() {
  const notesDir = path.join(__dirname, '..', 'public', 'notes');
  let completed = 0;
  let failed = 0;

  for (let i = 0; i < remainingTopics.length; i++) {
    const topic = remainingTopics[i];
    const targetDir = path.join(notesDir, topic.subjectId);
    fs.mkdirSync(targetDir, { recursive: true });

    const targetFile = path.join(targetDir, `${topic.slug}.md`);

    console.log(`[${i + 1}/${remainingTopics.length}] Generating: ${topic.subjectName} -> ${topic.name}...`);

    try {
      const markdown = await generateNotesForTopic(topic);
      fs.writeFileSync(targetFile, markdown + '\n');
      completed++;
      console.log(`  ✓ Saved to public/notes/${topic.subjectId}/${topic.slug}.md`);
    } catch (err) {
      failed++;
      console.error(`  ✗ Failed to generate: ${err.message}`);
    }

    // Rate-limiting pause: ~4 seconds between calls to stay under Gemini free tier limits (15 RPM)
    if (i < remainingTopics.length - 1) {
      await delay(4000);
    }
  }

  console.log('\n====================================');
  console.log(`Generation complete!`);
  console.log(`Successfully generated: ${completed}`);
  console.log(`Failed: ${failed}`);
  console.log('====================================');

  // Rebuild the manifest list
  console.log('Rebuilding manifest.json...');
  try {
    const manifest = [];
    const subjects = fs.readdirSync(notesDir).filter(name => {
      return fs.statSync(path.join(notesDir, name)).isDirectory();
    });

    subjects.forEach(sub => {
      const subPath = path.join(notesDir, sub);
      const files = fs.readdirSync(subPath).filter(f => f.endsWith('.md'));
      files.forEach(file => {
        const slug = path.basename(file, '.md');
        manifest.push(`${sub}:${slug}`);
      });
    });

    fs.writeFileSync(path.join(notesDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
    console.log(`Successfully rebuilt manifest.json with ${manifest.length} total notes!`);
  } catch (err) {
    console.error('Error rebuilding manifest.json:', err.message);
  }
}

run();
