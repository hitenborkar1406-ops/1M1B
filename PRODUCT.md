# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Students, campus staff, and households who are deciding where a physical waste item belongs at the moment of disposal.

## Product Purpose

EcoSort AI identifies waste from a photo, live camera, or text description and turns the result into a practical sorting and contamination-prevention protocol. Success means a user can make a confident source-separation decision in seconds.

## Positioning

The product combines multimodal item recognition with material composition, contamination risk, disposal steps, impact estimates, and local drop-off guidance in one workflow.

## Operating Context

The primary scene is a busy campus dining hall, student residence, or household. Users may have only one hand free, limited attention, and an unfamiliar composite item. The product includes a scanner, demo presets, an impact dashboard, scan history, AI chat, deep LCA thinking, and project presentation content.

## Capabilities and Constraints

- Photo upload, live camera capture, and text query inputs.
- Gemini-backed classification and chat APIs with a fallback classification response when no API key is configured.
- Results include bin destination, confidence, materials, contamination warnings, disposal steps, upcycling ideas, and sustainability impact.
- Preserve the existing local development workflow and TypeScript/React architecture.
- Do not invent real recycling rules, locations, customers, benchmarks, or environmental claims beyond the supplied product data.

## Brand Commitments

The name EcoSort AI and its connection to the 1M1B AI for Sustainability internship and IBM SkillsBuild must remain visible in the product.

## Evidence on Hand

The working prototype and seeded campus waste examples in `src/data/sampleItems.ts` are the source of truth for the demonstrated experience. No external customer or impact evidence is provided.

## Product Principles

- Make the correct next action obvious.
- Explain contamination, not just classification.
- Keep multimodal input fast and forgiving.
- Make impact legible without distracting from sorting.

## Accessibility & Inclusion

Use keyboard-operable controls, visible focus states, readable contrast, responsive layouts, and text alternatives for image-driven interactions.
