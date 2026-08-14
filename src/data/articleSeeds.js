// Starter content for the "resources" Firestore collection. These are
// original, homemade articles (not links to external sites) — loaded via
// the "Load starter articles" button in AdminPanel, which batch-writes
// them the same way any admin-added resource is written.

const articleSeeds = [
  {
    title: 'Writing a Resume That Passes the ATS — and Wins Over a Human',
    category: 'Resumes & Applications',
    readTime: '7 min read',
    summary: "Most resumes are read by software before a person ever sees them. Here's how to format and write yours so it clears the filter and still reads well once it does.",
    content: `Before a recruiter ever opens your resume, it usually passes through an Applicant Tracking System (ATS) — software that parses your document, extracts your experience and skills, and ranks or filters candidates before a human looks at anything. A resume that's beautifully designed but poorly structured can get flagged or misread before it has a chance to make an impression.

The good news: writing for the ATS and writing for a human aren't actually in conflict. The same choices that make your resume machine-readable also make it easier for a busy recruiter to scan in the six or seven seconds they'll actually spend on it.

## Format for parsing, not decoration

Stick to a single-column layout with standard section headings ("Experience," "Education," "Skills"). Multi-column layouts, text boxes, tables, and graphics can scramble the order in which an ATS reads your content — sometimes badly enough that your most recent job reads as your oldest. Use a standard, widely-supported font (Arial, Calibri, Georgia) at 10–12pt, and save as a .docx or a text-selectable PDF, not an image-based PDF.

Avoid putting critical information — your name, your most relevant job title — inside a header or footer element. Some parsers skip those sections entirely.

## Put your keywords where both the algorithm and the human look first

ATS systems and recruiters both weight the first few lines of your summary and the first bullet under each role more heavily than text buried at the bottom of a long list. If a job description says "cross-functional stakeholder management," and that's genuinely something you've done, use that exact phrase near the top of your resume — not just a synonym.

A dedicated **Skills** section, formatted as a simple comma-separated list or short bullets, gives the ATS an easy, concentrated zone to extract keywords from. Pull your keyword list directly from the job posting: read 5–10 postings for roles you want and note which terms show up again and again.

## Quantify everything you can

"Responsible for improving reporting process" tells a reader nothing. "Rebuilt the weekly sales dashboard in Power BI, cutting manual reporting time by 6 hours a week and reducing errors flagged by finance by 90%" tells them exactly what you did and why it mattered. Numbers don't have to be revenue or headcount — time saved, error rates, adoption rates, and satisfaction scores all work.

For every bullet, try to answer: *what did I do, how did I do it, and what changed because of it?*

## Don't try to trick the system

Some older advice suggests hiding keywords in white text or stuffing invisible repeated terms into a resume. Modern ATS platforms actively detect this and can flag or auto-reject an application as a result — the opposite of the intended effect. If a skill isn't genuinely yours, leave it off; a resume that gets you an interview you can't back up in person isn't actually helping you.

## Keep it tight

One page for early-career candidates, up to two pages once you have 8–10+ years of relevant experience. If you're cutting content, cut older or less relevant roles down to a line or two rather than trimming detail from your most recent, most relevant position.

## A simple pre-submit check

- Can you copy-paste your entire resume into a plain text document and still read it clearly, in the right order?
- Does your Skills section include the exact terms from the job posting, where true?
- Does every bullet under your most recent two roles include a number or a concrete outcome?
- Is your file a .docx or text-based PDF, not a scanned image?

Getting through the ATS isn't about gaming a system — it's about being specific and structured, which happens to be exactly what a human reader wants too.`,
  },
  {
    title: 'Mastering the STAR Method for Behavioral Interviews',
    category: 'Interviewing',
    readTime: '6 min read',
    summary: '"Tell me about a time when…" questions are predictable once you know the structure interviewers are listening for. Here\'s how to prepare answers that actually land.',
    content: `Behavioral interview questions — "Tell me about a time you disagreed with a manager," "Describe a project that failed" — are built on a simple premise: past behavior is the best predictor of future behavior. Interviewers aren't looking for a perfect story; they're looking for evidence of how you actually think and act under real conditions.

The STAR method gives your answer a shape that's easy to follow and hard to ramble through.

## The four parts

**Situation** — one or two sentences of context. What was the setting, and why did it matter?

**Task** — what were you specifically responsible for? Not the team, not the company — you.

**Action** — the bulk of your answer. What did you actually do, step by step? This is where most people either rush or drift into vague generalities ("I worked hard to fix it"). Be concrete: what decision did you make, what did you say in the difficult conversation, what did you build or change?

**Result** — what happened, ideally with a number or a clear before/after. If the result was mixed or the project didn't fully succeed, say so — and add what you learned or would do differently. Interviewers trust honest, reflective answers more than suspiciously perfect ones.

## The single biggest mistake

Most weak STAR answers over-describe the Situation and under-describe the Action. If you find yourself two minutes into an answer and still setting the scene, you're not leaving room for the part that actually shows off your judgment. Aim to get to your Action within about 15–20 seconds of context.

The second most common mistake is answering in "we" instead of "I." Team accomplishments are fine to reference for context, but the interviewer is evaluating *you* — they need to hear what you specifically decided, said, or did.

## Prepare stories, not scripts

Rather than trying to guess every possible question, prepare 8–10 solid stories from your recent experience that cover a range of themes: a conflict you navigated, a mistake you made and fixed, a time you influenced someone without authority, a project you led under a tight deadline, a time you used data to change a decision. Most behavioral questions map onto one of these themes, even when the wording is different.

Practice telling each story out loud — but not word-for-word the same way twice. If you memorize a script, you'll sound stiff, and a follow-up question that breaks your script can throw you off entirely. Instead, know the shape of the story (Situation → Task → Action → Result) and let the wording vary naturally.

## Keep answers to about 90 seconds

Long enough to show real depth, short enough to respect the interviewer's time. If they want more detail, they'll ask a follow-up — and a good follow-up question is actually a great sign that they're engaged.

## Adjust for video interviews

Most first-round interviews now happen over video. Without the ambient body language of an in-person room, pacing matters more: pause briefly before answering rather than filling dead air, and check in occasionally ("does that answer what you were looking for, or should I go into more detail on any part?") since it's harder to read the interviewer's reaction through a screen.

## A quick self-check before your next interview

Pick three of your prepared stories and time yourself telling them out loud. If any run past two minutes, look for the part where you're describing context instead of action — that's almost always where the trimming needs to happen.`,
  },
  {
    title: "How to Answer 'Tell Me About Yourself'",
    category: 'Interviewing',
    readTime: '5 min read',
    summary: "It's the most common opening question in any interview, and the easiest one to fumble. Here's a structure that turns it into your strongest moment, not your weakest.",
    content: `"Tell me about yourself" is almost always the first question in an interview, which means it sets the tone for everything that follows — and it's the question people prepare for the least, because it feels too open-ended to script.

It isn't actually open-ended. The interviewer is asking you to do one specific thing: give them a short, coherent narrative of who you are professionally and why you're a fit for this conversation. Not your life story. Not your resume read aloud.

## The present–past–future structure

A reliable way to answer: start with where you are now, briefly cover the relevant path that got you here, and land on why you're interested in this next step.

**Present** — What's your current role, and what's the headline of what you do? One or two sentences.

**Past** — The two or three career moments that are most relevant to *this* job, told briefly. Not a full chronological history — just the throughline that explains how you got the experience this role needs.

**Future** — Why this role, why now. This is the part people skip, and it's the part that actually answers the interviewer's underlying question: *why are you here, and why should we care?*

## Keep it under 90 seconds

If your answer runs past two minutes, you're probably including detail that belongs in a later answer, not the opener. The goal isn't to say everything about yourself — it's to give the interviewer a clear, confident frame for the rest of the conversation, and often to hand them a natural follow-up question.

## Tailor it to the role every time

A generic answer is the easiest way to sound like you're not that interested in this specific job. If you're interviewing for a role that leans heavily on data analysis, your "past" section should highlight the data-heavy parts of your background, even if a different part of your experience would be more relevant somewhere else. Read the job posting again right before the interview and ask: *which two or three things from my background does this person most need to hear about?*

## What to leave out

Skip your full employment history, personal details unrelated to the job, and — unless directly asked — a detailed account of why you left your last role. If you're navigating a layoff, a gap, or a difficult exit, keep that part brief and neutral ("my team was affected by a restructuring") and move the conversation forward rather than dwelling on it.

## A version for a career change

If you're pivoting industries or functions, the "past" section is where you draw the throughline explicitly: name the skill or pattern that transfers, rather than assuming the interviewer will connect the dots themselves. "I spent four years in operations solving process problems with data — this role is the same skill applied to a product I actually want to work on" does more work than a chronological list of past job titles that don't obviously relate.

## Try it out loud

Write a rough draft, then say it out loud and time it. Most first drafts run too long and spend too much time on the past. Cut until it's under 90 seconds and ends on your future, not your history.`,
  },
  {
    title: 'The Salary Negotiation Playbook',
    category: 'Compensation & Negotiation',
    readTime: '8 min read',
    summary: "Roughly half of job seekers accept the first offer without negotiating — and leave real money on the table. Here's a concrete plan for the conversation.",
    content: `Surveys consistently find that fewer than half of job seekers negotiate their starting salary — most simply accept the first number. That's a costly habit: research tracking negotiated versus non-negotiated offers has found people who negotiate end up with meaningfully higher pay, often somewhere in the range of 10–20% more than those who don't, and workers who skip the conversation entirely leave thousands of dollars on the table in that single offer alone.

Most employers expect it. The vast majority of hiring managers anticipate some negotiation and build room into their initial offer accordingly — asking is rarely seen as pushy or ungrateful when it's done professionally.

## Do the research before you get an offer

You can't negotiate confidently without knowing your market rate. Cross-reference a few sources — industry salary surveys, aggregated compensation data for your role and level, and if possible, direct conversations with people in similar roles — rather than relying on a single number. Location, company size, and industry all move the number meaningfully, so make sure your comparisons are close matches.

Decide your range before the conversation starts: a target number, and a walk-away number below which the offer doesn't work for you.

## Let them name a number first when you can

If you're asked for your salary expectations early in the process, it's reasonable to redirect: "I'd love to learn more about the role and the full compensation package before landing on a number — what range did you have in mind for this position?" This isn't always possible, but when it is, it keeps you from anchoring the conversation too low.

## When the offer comes, don't answer immediately

You're allowed — expected, even — to say "Thank you, I'm excited about this. Can I take a day or two to review the full offer?" Negotiating in the moment, especially over the phone, puts you at a disadvantage. A short pause to respond in writing, where you can be precise, almost always works in your favor.

## Anchor with a number, not a feeling

Vague requests ("is there any flexibility?") tend to get vague responses. Instead: "Based on my research into market rates for this role and my experience with [specific relevant skill], I was hoping we could get closer to $X. Is there room to work toward that?" Naming a specific number, backed by a specific reason, signals that you've done your homework and gives the other side something concrete to respond to.

## Negotiate the whole package, not just base salary

If base salary genuinely can't move — sometimes it's fixed by a banding system — there's often more room elsewhere: signing bonus, additional equity, an earlier performance review date, extra vacation days, remote/hybrid flexibility, or a professional development budget. Ask what's negotiable before assuming the conversation is over.

## Keep it collaborative, not adversarial

The framing that tends to work best is "help me get to yes," not "convince me to accept." You're not fighting the person across the table — in most cases, they want to bring you on and are working within their own constraints. Phrases like "what would it take to get to X" invite them to problem-solve with you rather than defend a position.

## Get the final offer in writing before you respond

Verbal agreements can shift. Once you've agreed on terms, ask for the updated offer in writing before you formally accept, and read it closely against what was discussed.

## If they say no

A firm "no" to a specific ask isn't necessarily the end of the conversation. It's reasonable to ask what would need to be true for that number to be possible in the future — at your six-month review, for instance — and to get that in writing as a plan, not just a verbal promise.

Negotiating well isn't about being aggressive. It's about being prepared, specific, and willing to have a conversation that most people skip entirely.`,
  },
  {
    title: 'Making a Career Pivot Without Starting Over',
    category: 'Career Growth',
    readTime: '7 min read',
    summary: 'Changing industries or functions can feel like erasing years of experience. It rarely has to — here\'s how to reframe what you\'ve built and make the case for the leap.',
    content: `A career pivot feels riskier than it usually is, because it's easy to frame it as starting from zero. In reality, very few career changes actually erase your prior experience — they require you to translate it, and translation is a skill you can learn.

## Start by naming the transferable skill, not the transferable job title

Employers in a new field don't care that you were a "teacher" if you're moving into corporate training — they care that you've designed curricula, managed a room of 30 people with competing needs, and communicated complex material clearly under time pressure. The job title doesn't transfer. The underlying skill does.

Go through your resume line by line and ask, for each bullet: *what is the actual skill this demonstrates, stripped of industry-specific language?* "Managed the classroom's behavior plan" becomes "designed and enforced a structured process for managing group dynamics under pressure" — a sentence that applies just as well to project management or people leadership.

## Build a bridge, not a leap, wherever you can

A pivot from marketing into product management is a shorter bridge than a pivot from marketing into mechanical engineering. If the field you want is a big leap from where you are, look for an intermediate role that shares meaningful overlap with both — a marketing analyst role, for instance, as a stepping stone toward a fully technical data role. It's not a detour; it's usually the fastest real path.

## Close the credibility gap with evidence, not just enthusiasm

Hiring managers considering a career-changer are usually weighing one real risk: *will this person actually be able to do the job, or are they just interested in it?* Enthusiasm alone doesn't answer that. What does:

- A small project, freelance job, or volunteer role in the new field, even unpaid or informal
- A relevant certification or course, especially one with a concrete deliverable (a portfolio, a capstone project)
- Direct conversations with people already in the field, which sharpen your understanding of what the job actually involves day-to-day (and often surface referrals)

Even a few weeks of visible effort changes how a hiring manager reads your application — it shows the interest is tested, not theoretical.

## Rewrite your resume and LinkedIn for the job you want, not the job you had

This is the step most career-changers skip. If your resume is organized around your old field's language and priorities, a hiring manager in the new field has to do the translation work themselves — and most won't bother. Reorganize your bullets around the skills your target role actually needs, using that field's terminology. Your summary section, in particular, should state plainly what you're moving toward and why, rather than assuming it'll be obvious.

## Expect to answer "why" directly, and have a real answer

"Why are you leaving [field]?" and "why this, why now?" will come up in almost every conversation. A vague answer ("I wanted a change") reads as uncertain. A specific answer — what you were drawn to, what you tested to confirm it, what you're building toward — reads as intentional, even if the story is genuinely about dissatisfaction with your old path. Frame it forward, not just away from the last thing.

## Accept that the first move might come with a cost

Some pivots mean a lateral or even slightly lower starting point in the new field, in exchange for a faster runway toward where you actually want to be. That's a legitimate trade-off to make deliberately — just make sure you're making it deliberately, with a clear sense of the trajectory you're buying, not just accepting whatever's offered.

A pivot isn't a reset. It's a translation project — and the people who do it well are the ones who take the translation seriously instead of hoping the new field will connect the dots on its own.`,
  },
  {
    title: "Networking That Doesn't Feel Fake (Especially for Introverts)",
    category: 'Job Search & Networking',
    readTime: '6 min read',
    summary: "Networking has a reputation for feeling transactional and exhausting. It doesn't have to be either — here's an approach built around genuine, low-pressure conversations.",
    content: `Networking gets a bad reputation because most advice about it describes something that feels transactional: work a room, collect contacts, follow up with an ask. For introverts especially — and honestly, for most people — that model is exhausting and doesn't reflect how real professional relationships actually form.

There's a better model, and it plays to skills you probably already have.

## Quality beats quantity, every time

You don't need fifty new contacts. Three genuinely good conversations, each followed up on, will do more for your career than fifty business cards collected at an event and never touched again. Set a small, specific goal for any networking situation — "I'll have two real conversations today" — rather than an open-ended mandate to "network," which is vague enough to feel impossible.

## Lead with curiosity, not an ask

The strongest networking conversations don't start with what you need. They start with genuine interest in the other person's work: what they're building, what's been hard about their role lately, how they got to where they are. Listening closely and asking a good follow-up question does more to build a real connection than a polished pitch about yourself — and it plays directly to strengths that introverts often already have.

If you're networking with a specific goal in mind (a job lead, an introduction), it's fine to mention it — but near the end of the conversation, once you've actually connected, not as the opening line.

## Online networking is real networking

You don't have to network exclusively in rooms full of strangers. Commenting thoughtfully on someone's post, replying to a piece of writing with a genuine reaction, or reaching out about something specific they wrote or built are all legitimate ways to start a professional relationship — and they let you engage on your own schedule, without the pressure of live small talk.

A short, specific message beats a generic connection request every time: "I saw your post about the migration you led last quarter — we're facing something similar and I'd love to hear how you approached it" gives someone an easy, low-pressure way to respond.

## Prepare a few openers in advance

If live events genuinely make you anxious, scripting a few flexible openers in advance takes real pressure off: a question about the event itself, a comment about something you read recently in the field, a specific question about the other person's role. You don't need to be spontaneous — you need to not be starting from a blank page in the moment.

## Follow up like you mean it

The single most under-used networking skill is a good follow-up. A short note within a day or two — referencing something specific from the conversation, not a generic "great to meet you" — is what actually turns a one-time interaction into an ongoing relationship. If you said you'd send an article or make an introduction, do it promptly; it's a small thing that builds real trust.

## Be honest about being new to this

It's genuinely fine to say, in a professional setting, that you're still building your networking muscle. Most people respond well to honesty and effort — the goal isn't to perform confidence you don't feel, it's to have a real conversation, and admitting a little discomfort often makes the other person more comfortable too.

## Start small, and start with people you already know

Before reaching out to strangers, revisit your existing network — former colleagues, classmates, people you've worked with in the past. A short "how are things going, I'd love to catch up" message to someone you already have a relationship with is a much easier place to start than cold outreach, and it often leads somewhere useful faster than you'd expect.

Networking, done well, is just relationship-building with a professional angle. If you already know how to be a good listener and a thoughtful follow-up sender, you already have most of what you need.`,
  },
  {
    title: 'Building a LinkedIn Profile Recruiters Actually Find',
    category: 'Personal Branding',
    readTime: '6 min read',
    summary: "Most recruiters search LinkedIn before they post a job. If your profile isn't built to be found and to hold up once it is, you're invisible to a huge share of opportunities.",
    content: `The large majority of recruiters use LinkedIn as a primary sourcing tool — searching by keyword and skill before, or instead of, posting a public job listing. A well-built profile isn't just an online resume; it's a piece of infrastructure that keeps working for you passively, surfacing opportunities you never applied for.

## Get found: keywords first

Recruiter searches on LinkedIn work like any other keyword search. If your headline, About section, and experience bullets don't contain the specific terms recruiters search for in your field, you won't show up — no matter how impressive your actual background is.

Find these terms the same way you would for a resume: read 10–15 postings for roles you'd want, and note the skills and phrases that repeat. Work the honest, accurate ones into your profile — not just your Skills list, but your headline and About section too, since those carry more search weight.

## Your headline is not your job title

The default headline LinkedIn generates is just your current title and company. Replace it with something that states what you actually do and for whom, in language a recruiter searching for your next role would use: "Product Manager | B2B SaaS | Turning user research into roadmaps that ship" tells a recruiter far more, and contains far more searchable keywords, than "Product Manager at [Company]."

## Write an About section that's about value, not a resume repeat

The About section is the one place on your profile written in your own voice. Use it to say, in a few short paragraphs: what you do, what you're particularly good at, and — if you're open to it — what kind of next opportunity you're looking for. Avoid simply restating your work history; that's what the Experience section is for. Write it the way you'd introduce yourself to someone useful at an event, not the way you'd write a formal bio.

## A photo and a banner aren't optional

Profiles with a professional photo receive dramatically more views than profiles without one — it's one of the single highest-leverage five-minute changes you can make. It doesn't need to be a studio headshot; a clear, friendly, well-lit photo where you're the only person in frame is enough. A custom banner image (even a simple branded one) adds a bit more polish but matters far less than the photo.

## List skills deliberately, and get them endorsed

Profiles with five or more listed skills are dramatically more discoverable in recruiter search than profiles with none. List the skills that are genuinely core to the role you want, in priority order, and don't be shy about asking a few former colleagues to endorse the ones that matter most — verified endorsements carry real weight in how the profile ranks.

## Recommendations carry more trust than you'd expect

A profile with a few detailed, specific recommendations reads as significantly more credible than one with none — to both the algorithm and to a human skimming your profile. Ask former managers or close collaborators directly, and make it easy for them: remind them of a specific project you worked on together, so they're not starting from a blank page.

## Post occasionally — it's not optional if you want visibility

LinkedIn's algorithm favors profiles that show some activity, and genuinely useful posts (a lesson learned, an observation about your field, a resource you found valuable) tend to perform far better than generic promotional content or job announcements. You don't need to post often — even once every few weeks, if it's genuinely worth reading, keeps your profile active and visible.

## A five-minute audit

Look at your profile as if you were a recruiter with 15 seconds. Does your headline say what you do and for whom? Does your photo look professional and current? Does your About section read like a person, not a resume? If any answer is no, that's your next five-minute task.`,
  },
  {
    title: 'How to Ask for a Promotion — and Actually Get It',
    category: 'Career Growth',
    readTime: '7 min read',
    summary: "Promotions rarely happen automatically, even for strong performers. Here's how to build the case, time the conversation, and handle it if the answer is no.",
    content: `A common and costly assumption is that consistently good work will eventually get noticed and rewarded on its own. It sometimes does — but far more often, promotions go to people who make the case for themselves clearly, at the right time, to the right person. Being good at your job and being good at getting recognized for it are two different skills, and the second one is learnable.

## Start building the case months before you ask

The strongest promotion conversations aren't a single ask — they're the visible conclusion of months of documented impact. Keep a running record of your accomplishments as they happen, not reconstructed from memory right before a review: projects you led, problems you solved, measurable outcomes, positive feedback you received. When the conversation comes, you want specifics, not a general sense that you've "been doing a lot."

## Understand what the next level actually requires

Ask your manager directly, well before you plan to make your case: "What does the next level look like, specifically, and what would you need to see from me to support that move?" This does two things — it gives you a concrete target instead of a vague sense of "doing more," and it puts your manager on notice that you're serious, which often means they start advocating for you before you've formally asked.

If your company has published leveling criteria or a career ladder, read it closely and map your recent work directly onto its language.

## Make the case in terms of impact, not tenure

"I've been in this role for two years" is not, on its own, a case for promotion — time served isn't the same as expanded scope. The stronger frame is: "here's the impact I've had, here's evidence I'm already operating at the next level, and here's what I'd take on next." If you can point to work you're already doing that technically belongs to the level above yours, that's the strongest evidence of all.

## Time the conversation deliberately

Bring it up with enough lead time before a formal review or promotion cycle that your manager has room to advocate for you internally — most promotion decisions aren't made unilaterally by one manager in the room; they go through a broader calibration process that takes time. Asking the week before decisions are finalized is usually too late for that cycle.

## Practice the actual conversation

A short, direct opener works better than an apologetic or hedged one: "I'd like to talk about my path toward [next level]. Based on the impact I've had over the last [period] — [one or two concrete examples] — I think I'm ready to take that on, and I'd like your thoughts on what that would take." This states your case, invites a real conversation, and doesn't box your manager into an immediate yes/no.

## If the answer is yes — get it in writing and follow through

Confirm the timeline and any final conditions in writing (even a follow-up email summarizing the conversation is enough), and follow through visibly on whatever was agreed.

## If the answer is no — ask for specifics, not just an explanation

A vague "not quite yet" is not useful on its own. Ask directly: "What specifically would need to be true for this to be a yes at the next review?" Get concrete criteria, and ideally a rough timeline, in writing if possible. This turns a disappointing answer into an actual plan — and if your manager can't articulate specific criteria, that's useful information too: it may mean the case needs to go to someone else, or that this isn't the right environment for the growth you're looking for.

## Know when the honest answer is to look elsewhere

If you've made a strong case, met the stated criteria, and are still met with vague deferrals over multiple cycles, that's a real signal. Sometimes the fastest path to the title and compensation you've earned is a lateral move to a company that's hiring for exactly the role you've already proven you can do.`,
  },
  {
    title: 'Surviving a Layoff: Your First 30 Days',
    category: 'Job Search & Networking',
    readTime: '7 min read',
    summary: "A layoff is disorienting even when you saw it coming. Here's a concrete, practical sequence for the first month — the logistics, the mindset, and the job search itself.",
    content: `A layoff is one of the more destabilizing things that can happen in a career, and it's made worse by how little control you have over the timing. The single most useful thing you can do in the first few days is turn a vague, overwhelming situation into a short list of concrete next steps.

## Week 1: Handle the logistics first

Before anything else, get a clear picture of the practical details: your last paycheck date, what happens to your health insurance and by when, whether you're receiving severance and under what terms, and whether unemployment benefits apply in your situation. If you're offered a severance agreement, read it fully before signing — many include a review period, and it's reasonable to take that time, including having someone else look it over if the terms are complex or if it includes a non-compete or non-disparagement clause you don't fully understand.

Update your budget for a job search that may take longer than you'd like. Knowing your real runway — how many months you can cover essential expenses — replaces a vague sense of financial anxiety with a specific number you can plan around.

## Give yourself a short, real window to process it

A layoff often triggers a genuine grief response, even when it was clearly not about your performance. Trying to skip straight to "productive job search mode" without any space to process usually backfires — either as burnout a few weeks in, or as a flat, unconvincing energy in early interviews. A few days to a week of deliberately not job-searching, focused on rest and reconnecting with people who aren't part of your professional life, tends to produce a stronger search once it starts.

## Rebuild your materials before you start applying

Resist the urge to start applying immediately with old materials. Update your resume and LinkedIn first — both to reflect your most recent role accurately, and because a wave of new applications with a stale resume tends to convert worse than a smaller number sent with sharp, current materials.

Decide, in a sentence, how you'll describe the layoff if it comes up: something honest, brief, and forward-looking. "My team was affected by a broader restructuring — it wasn't performance-related, and I'm looking for [what you want next]" is enough. You don't owe anyone a longer explanation, and dwelling on it in an interview rarely helps your case.

## Tell your network directly, not just LinkedIn

A short, direct message to people who might genuinely be able to help — former colleagues, managers, people in your field — tends to work far better than a single public post. Be specific about what you're looking for; "let me know if you hear of anything" is easy to ignore, while "I'm looking for [specific role] at [type of company] — would love an intro if you know anyone" gives people something concrete to act on.

Most roles are filled at least partly through referrals, which makes this one of the highest-leverage things you can do in the first weeks, even though it can feel uncomfortable to ask.

## Build a sustainable weekly rhythm

A job search without structure tends to either stall out or consume every waking hour, both of which hurt your chances. A reasonable weekly target: a set number of well-tailored applications (quality over volume), a few networking conversations, and dedicated time for interview prep or skill-building — with clear time off in between, not constant low-grade searching.

## Consider whether this is a moment for a bigger change

Some people use a layoff as the forcing function for a career pivot or a move they'd been considering for a while. That's a legitimate path — but it's worth deciding deliberately, with a clear-eyed sense of the tradeoffs (see our guide on making a career pivot), rather than drifting into it out of uncertainty about what else to do.

## It's temporary, even when it doesn't feel that way

Layoffs are common enough that they say very little about you individually — they're overwhelmingly driven by budget and strategy decisions well above any one person's performance. The first 30 days are the hardest part logistically and emotionally; having a concrete plan for them is the fastest way through.`,
  },
];

module.exports = articleSeeds;
