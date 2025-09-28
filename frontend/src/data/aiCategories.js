import { Heart, Shield, Waves } from 'lucide-react';

export const AI_CATEGORIES = {
  medical: {
    title: 'Medical Emergency',
    icon: Heart,
    color: 'red',
    subcategories: [
      {
        id: 'heart_attack',
        name: 'Heart Attack',
        prompt: 'Person having chest pain/heart attack symptoms',
        response: "🚨 HEART ATTACK PROTOCOL:\n\n1. Call 911 IMMEDIATELY\n2. Have person sit down, lean against wall\n3. Loosen tight clothing around neck/chest\n4. If conscious, give aspirin if available (ask about allergies first)\n5. Monitor breathing - if stops, begin CPR\n6. Stay calm, reassure: 'Help is coming, you're doing great'\n7. Note time symptoms started for paramedics"
      },
      {
        id: 'stroke',
        name: 'Stroke',
        prompt: 'Person showing stroke symptoms (F.A.S.T. signs)',
        response: "🧠 STROKE PROTOCOL:\n\n1. Call 911 IMMEDIATELY - time is critical\n2. Note exact time symptoms started\n3. FAST check: Face drooping? Arm weakness? Speech difficulty? Time to call 911\n4. Keep person lying down, head slightly elevated\n5. Do NOT give food, water, or medication\n6. Monitor breathing and pulse\n7. Reassure: 'Stay with me, help is almost here'"
      },
      {
        id: 'seizure',
        name: 'Seizure',
        prompt: 'Person having a seizure',
        response: "⚡ SEIZURE PROTOCOL:\n\n1. Call 911 if seizure lasts >5 min or person is injured\n2. Clear area of hard/sharp objects\n3. Place something soft under their head\n4. Turn person on their side (recovery position)\n5. Do NOT restrain or put anything in mouth\n6. Time the seizure duration\n7. Stay with them until fully conscious\n8. Speak calmly: 'You're safe, I'm here to help'"
      },
      {
        id: 'bleeding',
        name: 'Severe Bleeding',
        prompt: 'Person with severe bleeding/trauma',
        response: "🩸 BLEEDING CONTROL:\n\n1. Call 911 immediately\n2. Apply direct pressure with clean cloth/gauze\n3. If blood soaks through, add more layers (don't remove)\n4. Elevate wounded area above heart if possible\n5. Apply pressure to pressure points if needed\n6. Watch for shock symptoms (pale, cold, weak pulse)\n7. Keep person calm and lying down\n8. Say: 'You're going to be okay, help is coming'"
      }
    ]
  },
  safety: {
    title: 'Safety & Crime',
    icon: Shield,
    color: 'orange',
    subcategories: [
      {
        id: 'assault',
        name: 'Assault in Progress',
        prompt: 'Witnessing or involved in physical assault',
        response: "⚠️ ASSAULT RESPONSE:\n\n1. Call 911 IMMEDIATELY\n2. Do NOT intervene physically unless trained\n3. Be a good witness - note descriptions, license plates\n4. If safe, loudly shout 'Someone call 911!'\n5. Provide first aid to victim if attacker leaves\n6. Stay with victim until help arrives\n7. Document everything you witnessed\n8. Tell victim: 'You're safe now, help is here'"
      },
      {
        id: 'robbery',
        name: 'Robbery/Theft',
        prompt: 'Witnessing robbery or theft in progress',
        response: "💰 ROBBERY RESPONSE:\n\n1. Call 911 immediately\n2. Do NOT chase or confront suspects\n3. Note suspect descriptions, vehicle details, direction of travel\n4. Check if anyone is injured\n5. Preserve the crime scene\n6. Be available to give statement to police\n7. Support any victims emotionally\n8. Remember: Property can be replaced, lives cannot"
      }
    ]
  },
  environmental: {
    title: 'Environmental',
    icon: Waves,
    color: 'blue',
    subcategories: [
      {
        id: 'fire',
        name: 'Fire Emergency',
        prompt: 'Fire emergency or burn injuries',
        response: "🔥 FIRE EMERGENCY:\n\n1. Call 911 immediately\n2. Get everyone out and stay out\n3. For burns: Cool with running water for 10-20 minutes\n4. Remove from heat source, not clothing stuck to skin\n5. Cover burns loosely with sterile gauze\n6. Do NOT use ice, butter, or ointments\n7. Treat for shock if severe burns\n8. Reassure: 'Help is coming, you did the right thing'"
      }
    ]
  }
};