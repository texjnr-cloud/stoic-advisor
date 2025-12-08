// services/claudeApi.js
// Service to call Claude API and generate stoic advice

import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.REACT_APP_CLAUDE_API_KEY,
});

// System prompt: How Marcus Aurelius should respond
const MARCUS_AURELIUS_SYSTEM_PROMPT = `You are Marcus Aurelius, the Stoic philosopher and Roman Emperor. 
You are responding to a modern person seeking advice on a personal dilemma.

Your response must include:
1. A relevant Stoic quote (can be from Marcus Aurelius' Meditations or paraphrased in his voice)
2. Tailored advice that addresses their specific situation
3. How they can embody one or more of the Stoic virtues (Wisdom, Courage, Temperance, Justice)
4. A specific, actionable perspective shift they can make right now

Your tone is direct but warm, without sentimentality. You acknowledge their emotions but help them see the situation through a Stoic lens.
You remind them what is in their control and what is not.

Format your response as JSON with this structure:
{
  "quote": "The relevant stoic quote",
  "advice": "2-3 paragraphs of tailored advice addressing their situation and the virtues",
  "virtue_focus": ["Wisdom", "Courage", "Temperance"], // which virtues apply
  "control_insight": "What they can control in this situation",
  "perspective_shift": "A specific reframing they can adopt"
}`;

/**
 * Generate stoic advice for a user's dilemma
 * @param {string} dilemma - The user's situation or question
 * @returns {Promise<Object>} - Parsed response with quote, advice, etc.
 */
export async function generateStoicAdvice(dilemma) {
  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-1-20250805',
      max_tokens: 1500,
      system: MARCUS_AURELIUS_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `I'm struggling with this situation: ${dilemma}\n\nHow would you advise me as a Stoic?`,
        },
      ],
    });

    // Extract text from response
    const responseText = message.content[0].text;
    
    // Parse JSON response
    const parsed = JSON.parse(responseText);
    
    return {
      quote: parsed.quote,
      advice: parsed.advice,
      virtue_focus: parsed.virtue_focus,
      control_insight: parsed.control_insight,
      perspective_shift: parsed.perspective_shift,
    };
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw new Error(`Failed to generate stoic advice: ${error.message}`);
  }
}

/**
 * Generate a personalized action plan based on the advice
 * @param {string} dilemma - The user's situation
 * @param {string} advice - The previously generated advice
 * @returns {Promise<Object>} - Action plan with weekly steps
 */
export async function generateActionPlan(dilemma, advice) {
  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-1-20250805',
      max_tokens: 1200,
      system: `You are Marcus Aurelius helping someone create a practical stoic action plan.
Based on the advice you gave, create a 4-week action plan with specific, small, daily/weekly actions.
Format as JSON:
{
  "weeks": [
    {
      "week": 1,
      "theme": "Brief theme",
      "daily_actions": ["Action 1", "Action 2", "Action 3"],
      "virtue_to_practice": "Which virtue to focus on"
    }
  ]
}`,
      messages: [
        {
          role: 'user',
          content: `Their situation: ${dilemma}\n\nAdvice given: ${advice}\n\nCreate a 4-week action plan with daily/weekly concrete steps.`,
        },
      ],
    });

    const responseText = message.content[0].text;
    const parsed = JSON.parse(responseText);
    
    return {
      weeks: parsed.weeks,
    };
  } catch (error) {
    console.error('Error generating action plan:', error);
    throw new Error(`Failed to generate action plan: ${error.message}`);
  }
}

/**
 * Generate follow-up reflection prompts
 * @param {string} dilemma - The user's original situation
 * @returns {Promise<Object>} - Array of reflection prompts
 */
export async function generateJournalPrompts(dilemma) {
  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-1-20250805',
      max_tokens: 800,
      system: `You are Marcus Aurelius creating reflection prompts for deep self-inquiry.
Create 5 thoughtful questions that help someone process their situation from a Stoic perspective.
Format as JSON:
{
  "prompts": [
    "Question 1?",
    "Question 2?"
  ]
}`,
      messages: [
        {
          role: 'user',
          content: `Their situation: ${dilemma}\n\nCreate 5 reflection prompts to help them process this Stoically.`,
        },
      ],
    });

    const responseText = message.content[0].text;
    const parsed = JSON.parse(responseText);
    
    return {
      prompts: parsed.prompts,
    };
  } catch (error) {
    console.error('Error generating journal prompts:', error);
    throw new Error(`Failed to generate journal prompts: ${error.message}`);
  }
}

/**
 * Generate a follow-up response based on user's progress
 * @param {string} dilemma - Original situation
 * @param {string} advice - Original advice
 * @param {string} userUpdate - How they've been implementing the advice
 * @returns {Promise<Object>} - Follow-up guidance
 */
export async function generateFollowUp(dilemma, advice, userUpdate) {
  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-1-20250805',
      max_tokens: 1200,
      system: `You are Marcus Aurelius providing follow-up guidance.
The user has been working on a situation and wants further advice.
Acknowledge their effort, identify where they might be struggling, and provide refined guidance.
Format as JSON:
{
  "acknowledgment": "Recognition of their effort",
  "struggle_identified": "What they might be struggling with",
  "refined_guidance": "More specific advice for where they are now",
  "next_step": "Concrete next step"
}`,
      messages: [
        {
          role: 'user',
          content: `Original situation: ${dilemma}\n\nOriginal advice: ${advice}\n\nWhat I've been experiencing: ${userUpdate}\n\nWhat should I do next?`,
        },
      ],
    });

    const responseText = message.content[0].text;
    const parsed = JSON.parse(responseText);
    
    return {
      acknowledgment: parsed.acknowledgment,
      struggle_identified: parsed.struggle_identified,
      refined_guidance: parsed.refined_guidance,
      next_step: parsed.next_step,
    };
  } catch (error) {
    console.error('Error generating follow-up:', error);
    throw new Error(`Failed to generate follow-up: ${error.message}`);
  }
}

// Export all functions
export const claudeApi = {
  generateStoicAdvice,
  generateActionPlan,
  generateJournalPrompts,
  generateFollowUp,
};

export default claudeApi;
