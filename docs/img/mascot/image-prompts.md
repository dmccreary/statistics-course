# Sylvia the Statistical Squirrel — Image Prompts

This file contains ready-to-use AI image generation prompts for all seven mascot poses of **Sylvia the Statistical Squirrel**, the pedagogical agent for this AP Statistics intelligent textbook.

## Visual Reference

All prompts below are calibrated to match the established visual style of the existing reference image:

![Sylvia welcome pose](./welcome.png)

That image is the **visual ground truth** — every other pose must match its species, fur colors, eye shape, glasses style, tail shape, and overall art style so the seven poses read as the same character.

## Character Lock — Include in Every Prompt

This block describes Sylvia's invariant visual traits. **Paste it verbatim into every pose prompt below** so the model regenerates the same character each time. Do not paraphrase — small wording changes drift the look.

```
Sylvia is a friendly red squirrel pedagogical mascot for an AP Statistics
textbook. She has warm auburn / orange-red fur on her head, back, arms, and
the upper portion of her tail, with a soft cream-colored belly, chest, inner
arms, paws, and lower tail. She has the characteristic tufted ear tips of a
red squirrel. Her eyes are large, round, expressive hazel-amber with bright
catchlights. She wears round, slightly oversized eyeglasses with warm
amber-brown / tortoiseshell frames that sit forward on her muzzle. Her nose
is small and pink, and her mouth is friendly with a gentle open smile
showing two small upper front teeth. She has a very fluffy, oversized
bushy two-tone tail (auburn outer, cream inner) that curls behind and above
her in a soft S-curve. She stands upright on her hind legs in a clear
three-quarter front view. Style: soft painterly cartoon illustration with
warm, slightly saturated colors, gentle airbrushed shading, clean dark
outlines on key features, no harsh black lineart, no rim lighting.

Output: a single PNG with a fully transparent background. The background
MUST be transparent — do NOT use a white, black, gray, sky, scene, or
checkered background. No ground shadow, no scenery, no border, no frame,
no text, no caption, no watermark, no logo, no UI elements. The character
must be fully contained inside the frame with a small uniform margin of
empty (transparent) space on all sides.
```

## How to Use These Prompts

1. Copy one pose prompt at a time into your AI image generator (ChatGPT/DALL·E, Midjourney, Stable Diffusion, etc.).
2. Generate at **1024x1024** for best quality.
3. Save with the exact filename shown (e.g., `thinking.png`) into `docs/img/mascot/`.
4. After saving, trim transparent padding so Sylvia displays at full size in the 90px admonition slot:

   ```bash
   python ~/Documents/ws/ibook-skills/src/image-utils/trim-padding-from-image.py docs/img/mascot/neutral.png
   python ~/Documents/ws/ibook-skills/src/image-utils/trim-padding-from-image.py docs/img/mascot/thinking.png
   python ~/Documents/ws/ibook-skills/src/image-utils/trim-padding-from-image.py docs/img/mascot/tip.png
   python ~/Documents/ws/ibook-skills/src/image-utils/trim-padding-from-image.py docs/img/mascot/warning.png
   python ~/Documents/ws/ibook-skills/src/image-utils/trim-padding-from-image.py docs/img/mascot/encouraging.png
   python ~/Documents/ws/ibook-skills/src/image-utils/trim-padding-from-image.py docs/img/mascot/celebration.png
   ```

   (`welcome.png` is already the reference — leave it as-is or re-trim if needed.)

5. Preview all seven side-by-side via the rendering test page at `docs/learning-graph/mascot-test.md`.

---

## Pose 1 — Neutral / Default

**Filename:** `neutral.png`
**Use:** General sidebars, introductions, default inline use.

```
Generate a NEUTRAL pose of Sylvia the Statistical Squirrel.

Sylvia is a friendly red squirrel pedagogical mascot for an AP Statistics
textbook. She has warm auburn / orange-red fur on her head, back, arms, and
the upper portion of her tail, with a soft cream-colored belly, chest, inner
arms, paws, and lower tail. She has the characteristic tufted ear tips of a
red squirrel. Her eyes are large, round, expressive hazel-amber with bright
catchlights. She wears round, slightly oversized eyeglasses with warm
amber-brown / tortoiseshell frames that sit forward on her muzzle. Her nose
is small and pink, and her mouth is friendly with a gentle open smile
showing two small upper front teeth. She has a very fluffy, oversized
bushy two-tone tail (auburn outer, cream inner) that curls behind and above
her in a soft S-curve. She stands upright on her hind legs in a clear
three-quarter front view. Style: soft painterly cartoon illustration with
warm, slightly saturated colors, gentle airbrushed shading, clean dark
outlines on key features, no harsh black lineart, no rim lighting.

Pose: Sylvia stands upright, balanced and still, facing the viewer in a
relaxed three-quarter front view. Both forepaws rest naturally near her
chest with no specific gesture — calm and open posture. Closed-mouth or
softly-smiling expression, eyes looking forward at the viewer. Tail curls
gently behind her. The pose should feel default, balanced, and
unassuming — suitable as an all-purpose illustration.

Output: a single PNG with a fully transparent background. The background
MUST be transparent — do NOT use a white, black, gray, sky, scene, or
checkered background. No ground shadow, no scenery, no border, no frame,
no text, no caption, no watermark, no logo, no UI elements. The character
must be fully contained inside the frame with a small uniform margin of
empty (transparent) space on all sides.
```

---

## Pose 2 — Welcome / Introduction *(reference — already exists)*

**Filename:** `welcome.png`
**Use:** Chapter openings, "let's get started" moments.
**Status:** This pose is the visual reference. Only regenerate if you want to refresh it.

```
Generate a WELCOME pose of Sylvia the Statistical Squirrel.

Sylvia is a friendly red squirrel pedagogical mascot for an AP Statistics
textbook. She has warm auburn / orange-red fur on her head, back, arms, and
the upper portion of her tail, with a soft cream-colored belly, chest, inner
arms, paws, and lower tail. She has the characteristic tufted ear tips of a
red squirrel. Her eyes are large, round, expressive hazel-amber with bright
catchlights. She wears round, slightly oversized eyeglasses with warm
amber-brown / tortoiseshell frames that sit forward on her muzzle. Her nose
is small and pink, and her mouth is friendly with a gentle open smile
showing two small upper front teeth. She has a very fluffy, oversized
bushy two-tone tail (auburn outer, cream inner) that curls behind and above
her in a soft S-curve. She stands upright on her hind legs in a clear
three-quarter front view. Style: soft painterly cartoon illustration with
warm, slightly saturated colors, gentle airbrushed shading, clean dark
outlines on key features, no harsh black lineart, no rim lighting.

Pose: Sylvia stands upright in a three-quarter front view, smiling warmly
with her mouth open in a friendly greeting. Her right forepaw is raised in
a cheerful wave near the side of her head, fingers / paw-pads spread
naturally. Her left forepaw rests in front of her chest. Eyes are bright,
wide, and direct at the viewer. Tail curls upward behind her in a happy
S-curve. The pose reads clearly as "hello — welcome, let's get started!"

Output: a single PNG with a fully transparent background. The background
MUST be transparent — do NOT use a white, black, gray, sky, scene, or
checkered background. No ground shadow, no scenery, no border, no frame,
no text, no caption, no watermark, no logo, no UI elements. The character
must be fully contained inside the frame with a small uniform margin of
empty (transparent) space on all sides.
```

---

## Pose 3 — Thinking / Key Insight

**Filename:** `thinking.png`
**Use:** Key concepts, "aha" moments, deep statistical insights.

```
Generate a THINKING pose of Sylvia the Statistical Squirrel.

Sylvia is a friendly red squirrel pedagogical mascot for an AP Statistics
textbook. She has warm auburn / orange-red fur on her head, back, arms, and
the upper portion of her tail, with a soft cream-colored belly, chest, inner
arms, paws, and lower tail. She has the characteristic tufted ear tips of a
red squirrel. Her eyes are large, round, expressive hazel-amber with bright
catchlights. She wears round, slightly oversized eyeglasses with warm
amber-brown / tortoiseshell frames that sit forward on her muzzle. Her nose
is small and pink, and her mouth is friendly with a gentle open smile
showing two small upper front teeth. She has a very fluffy, oversized
bushy two-tone tail (auburn outer, cream inner) that curls behind and above
her in a soft S-curve. She stands upright on her hind legs in a clear
three-quarter front view. Style: soft painterly cartoon illustration with
warm, slightly saturated colors, gentle airbrushed shading, clean dark
outlines on key features, no harsh black lineart, no rim lighting.

Pose: Sylvia stands upright in a three-quarter front view, head tilted
slightly upward and to one side. Her right forepaw is gently touching the
underside of her chin in a classic thoughtful "hmm" gesture. Eyes are
looking up and to the side as if working out an idea, with one eyebrow
lifted slightly. Mouth shows a small focused smile. A small soft yellow
glowing lightbulb floats just above her head, with two or three subtle
sparkle marks around it to signal a fresh insight. Tail curls gently
behind her. The pose reads as "I'm working this out" / "ooh, interesting!"

Output: a single PNG with a fully transparent background. The background
MUST be transparent — do NOT use a white, black, gray, sky, scene, or
checkered background. No ground shadow, no scenery (other than the small
floating lightbulb described above), no border, no frame, no text, no
caption, no watermark, no logo, no UI elements. The character must be
fully contained inside the frame with a small uniform margin of empty
(transparent) space on all sides.
```

---

## Pose 4 — Tip / Helpful Hint

**Filename:** `tip.png`
**Use:** Pro tips, study hints, calculator shortcuts, formula reminders.

```
Generate a TIP pose of Sylvia the Statistical Squirrel.

Sylvia is a friendly red squirrel pedagogical mascot for an AP Statistics
textbook. She has warm auburn / orange-red fur on her head, back, arms, and
the upper portion of her tail, with a soft cream-colored belly, chest, inner
arms, paws, and lower tail. She has the characteristic tufted ear tips of a
red squirrel. Her eyes are large, round, expressive hazel-amber with bright
catchlights. She wears round, slightly oversized eyeglasses with warm
amber-brown / tortoiseshell frames that sit forward on her muzzle. Her nose
is small and pink, and her mouth is friendly with a gentle open smile
showing two small upper front teeth. She has a very fluffy, oversized
bushy two-tone tail (auburn outer, cream inner) that curls behind and above
her in a soft S-curve. She stands upright on her hind legs in a clear
three-quarter front view. Style: soft painterly cartoon illustration with
warm, slightly saturated colors, gentle airbrushed shading, clean dark
outlines on key features, no harsh black lineart, no rim lighting.

Pose: Sylvia stands upright in a three-quarter front view with a knowing,
helpful expression. Her right forepaw is raised with index finger extended
upward in a clear "pro tip" gesture, paw lifted slightly above shoulder
height. Her left forepaw rests in front of her chest or hip. Eyes look
slightly toward the raised paw with a confident smile. A small bright
golden star or four-point sparkle glows just above the tip of the raised
finger to signal "useful tip!" Tail curls behind her. The pose reads
clearly as "here's a handy tip you'll want to remember."

Output: a single PNG with a fully transparent background. The background
MUST be transparent — do NOT use a white, black, gray, sky, scene, or
checkered background. No ground shadow, no scenery (other than the small
star sparkle described above), no border, no frame, no text, no caption,
no watermark, no logo, no UI elements. The character must be fully
contained inside the frame with a small uniform margin of empty
(transparent) space on all sides.
```

---

## Pose 5 — Warning / Common Mistake

**Filename:** `warning.png`
**Use:** Common pitfalls (e.g., correlation vs. causation, sample bias).

```
Generate a WARNING pose of Sylvia the Statistical Squirrel.

Sylvia is a friendly red squirrel pedagogical mascot for an AP Statistics
textbook. She has warm auburn / orange-red fur on her head, back, arms, and
the upper portion of her tail, with a soft cream-colored belly, chest, inner
arms, paws, and lower tail. She has the characteristic tufted ear tips of a
red squirrel. Her eyes are large, round, expressive hazel-amber with bright
catchlights. She wears round, slightly oversized eyeglasses with warm
amber-brown / tortoiseshell frames that sit forward on her muzzle. Her nose
is small and pink, and her mouth is friendly with a gentle open smile
showing two small upper front teeth. She has a very fluffy, oversized
bushy two-tone tail (auburn outer, cream inner) that curls behind and above
her in a soft S-curve. She stands upright on her hind legs in a clear
three-quarter front view. Style: soft painterly cartoon illustration with
warm, slightly saturated colors, gentle airbrushed shading, clean dark
outlines on key features, no harsh black lineart, no rim lighting.

Pose: Sylvia stands upright in a three-quarter front view, holding both
forepaws up in front of her at about chest height in a gentle "whoa,
careful here" gesture (palms / paw-pads facing the viewer). Her expression
is concerned but warm and caring — eyebrows pulled together slightly, eyes
wide and attentive, mouth in a small worried-but-friendly shape (not
frowning, not angry). A small soft amber-yellow caution mark — a single
exclamation point inside a rounded triangle — floats near her shoulder to
signal "watch out." Tail curls behind her. The pose reads clearly as
"hold on — common pitfall ahead, be careful." Sylvia is never scary or
scolding, just protectively alert.

Output: a single PNG with a fully transparent background. The background
MUST be transparent — do NOT use a white, black, gray, sky, scene, or
checkered background. No ground shadow, no scenery (other than the small
caution-mark icon described above), no border, no frame, no text inside
the caution mark or anywhere else, no caption, no watermark, no logo,
no UI elements. The character must be fully contained inside the frame
with a small uniform margin of empty (transparent) space on all sides.
```

---

## Pose 6 — Encouraging / "You've Got This"

**Filename:** `encouraging.png`
**Use:** Difficult sections, after a tough proof, normalizing struggle.

```
Generate an ENCOURAGING pose of Sylvia the Statistical Squirrel.

Sylvia is a friendly red squirrel pedagogical mascot for an AP Statistics
textbook. She has warm auburn / orange-red fur on her head, back, arms, and
the upper portion of her tail, with a soft cream-colored belly, chest, inner
arms, paws, and lower tail. She has the characteristic tufted ear tips of a
red squirrel. Her eyes are large, round, expressive hazel-amber with bright
catchlights. She wears round, slightly oversized eyeglasses with warm
amber-brown / tortoiseshell frames that sit forward on her muzzle. Her nose
is small and pink, and her mouth is friendly with a gentle open smile
showing two small upper front teeth. She has a very fluffy, oversized
bushy two-tone tail (auburn outer, cream inner) that curls behind and above
her in a soft S-curve. She stands upright on her hind legs in a clear
three-quarter front view. Style: soft painterly cartoon illustration with
warm, slightly saturated colors, gentle airbrushed shading, clean dark
outlines on key features, no harsh black lineart, no rim lighting.

Pose: Sylvia stands upright in a three-quarter front view giving an
enthusiastic but gentle thumbs-up with her right forepaw, paw raised about
shoulder height, thumb clearly extended upward. Her left forepaw rests
naturally at her side or near her chest. Her smile is warm and reassuring,
eyes soft and direct at the viewer with a slight squint of friendliness.
Body posture leans very slightly forward as if rooting for the reader.
Tail curls upward behind her in a confident, happy S-curve. The pose
radiates calm, supportive "you can do this — keep going" energy without
being over-the-top.

Output: a single PNG with a fully transparent background. The background
MUST be transparent — do NOT use a white, black, gray, sky, scene, or
checkered background. No ground shadow, no scenery, no border, no frame,
no text, no caption, no watermark, no logo, no UI elements. The character
must be fully contained inside the frame with a small uniform margin of
empty (transparent) space on all sides.
```

---

## Pose 7 — Celebration / Achievement

**Filename:** `celebration.png`
**Use:** End-of-section wrap-ups, mastered concepts, chapter completion.

> ⚠️ **Contrast note:** the celebration admonition uses a **dark deep-purple background** (`#311b4f`) so pale confetti and sparkles in this pose remain visible. Make sure the confetti / sparkle colors below stay pale (cream, gold, soft pink) so they pop against that dark background.

```
Generate a CELEBRATION pose of Sylvia the Statistical Squirrel.

Sylvia is a friendly red squirrel pedagogical mascot for an AP Statistics
textbook. She has warm auburn / orange-red fur on her head, back, arms, and
the upper portion of her tail, with a soft cream-colored belly, chest, inner
arms, paws, and lower tail. She has the characteristic tufted ear tips of a
red squirrel. Her eyes are large, round, expressive hazel-amber with bright
catchlights. She wears round, slightly oversized eyeglasses with warm
amber-brown / tortoiseshell frames that sit forward on her muzzle. Her nose
is small and pink, and her mouth is friendly with a gentle open smile
showing two small upper front teeth. She has a very fluffy, oversized
bushy two-tone tail (auburn outer, cream inner) that curls behind and above
her in a soft S-curve. She stands upright on her hind legs in a clear
three-quarter front view. Style: soft painterly cartoon illustration with
warm, slightly saturated colors, gentle airbrushed shading, clean dark
outlines on key features, no harsh black lineart, no rim lighting.

Pose: Sylvia is mid-celebration — both forepaws thrown joyfully up and
out into the air above her shoulders in a triumphant "hooray!" gesture,
fingers / paw-pads spread. She is in a small mid-air hop with her hind
paws lifted slightly off the implied ground (no ground line drawn). Eyes
are bright and squinted with delight, mouth open in a big happy smile.
Her tail flares upward and outward behind her in an excited curve. Around
her float small pieces of confetti and four-point sparkle stars in pale
cream, soft gold, and light pink — saturated enough to remain clearly
visible against a dark purple admonition background. The pose reads as
joyful, proud, "we did it!" energy.

Output: a single PNG with a fully transparent background. The background
MUST be transparent — do NOT use a white, black, gray, sky, scene, or
checkered background. No ground shadow, no ground line, no scenery
(other than the floating confetti / sparkles described above), no border,
no frame, no text, no caption, no watermark, no logo, no UI elements. The
character must be fully contained inside the frame with a small uniform
margin of empty (transparent) space on all sides. Confetti / sparkles
should be light pastel colors (cream, gold, soft pink) so they remain
visible against a dark purple background.
```

---

## Consistency Checklist

After you generate all seven, lay them out side by side and confirm:

- [ ] Same species (red squirrel with tufted ears) in every pose
- [ ] Same fur palette: auburn / orange-red back, cream belly
- [ ] Same round amber-brown / tortoiseshell glasses on every pose
- [ ] Same large hazel-amber eye color
- [ ] Same fluffy two-tone tail shape and proportion
- [ ] Same soft painterly cartoon style (no pose looks like a different artist)
- [ ] Fully transparent background on every PNG (no white square, no checkerboard)
- [ ] Celebration pose has pale confetti visible against dark purple
- [ ] Each PNG trimmed of excess transparent padding (run the trim script above)

If any pose drifts (wrong species, missing glasses, different art style), regenerate that single pose using its prompt — do **not** edit just one pose by hand, and do not regenerate all seven at once if only one is off.
