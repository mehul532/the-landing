// The three voices. Each one stands somewhere different in the same stairwell at 4:17 p.m.
// details: what each person notices about five parts of the photo (null = they don't notice it).
window.LANDING_STORIES = [
  {
    id: "resident",
    label: "The resident",
    place: "Third-floor turn",
    title: "The Turn Before My Own Door",
    paragraphs: [
      "Third-floor turn, where the bag always switches hands and the plastic has twisted into a rope across my fingers, left hand on the rail, right foot already on the worn middle of the next step, and I could do this with my eyes on the groceries. Eggs, bread, milk. Is the milk sweating through onto the receipt? I press the bag against my knee to check.",
      "Two floors down, the heavy door thumps shut and I don't turn around, because someone down there has been climbing and stopping and climbing again, and now they've stopped, and that's their business. My hand finds the smooth patch on the rail where everyone's hand goes, and then the little ridge before the bracket, and then the turn.",
      "Overhead, black lines cross more black lines, and I look down before they can turn into anything. My other hand feels wrong. It's empty. There should be a second bag in it. The potatoes. I left them at the checkout. I set the bag down on the landing, dig for my keys, and try to remember if the store closes at six."
    ],
    door: "Two floors down, the heavy door thumps shut and I don't turn around.",
    details: {
      railing: "My hand knows the smooth patch before I reach it.",
      pipes: null,
      top: null,
      window: null,
      stairs: "Bag across, left hand down, right foot next."
    }
  },
  {
    id: "visitor",
    label: "The visitor",
    place: "One flight up from the entrance",
    title: "Come Up When You Get Here",
    paragraphs: [
      "One flight up from the entrance, I stop. The text says, “Come up when you get here.” Come up how far? The earlier text said 4C. Is that four floors up, or three? My phone buzzes in my hand. A reminder I forgot to cancel. Something metal knocks somewhere above me. A bucket? I step to the side of the stairs and look at my phone so I seem less lost.",
      "The entrance bangs just below me, and I check the time again. 4:17. Was I supposed to be here at quarter past? I look straight up between the railings for someone leaning over to wave me up. Nobody. Just more railings. I can't see who used the door.",
      "Instructions, then: take the next flight, keep to one side, don't call out a name in a building you just walked into. A narrow window runs up the right side, crossed by steel; the afternoon is still going on out there without any instructions. I type “I'm here” and keep my thumb over the arrow while I listen for another step."
    ],
    door: "The entrance bangs just below me, and I check the time again.",
    details: {
      railing: "Which of these railings is the flight I need?",
      pipes: null,
      top: null,
      window: "Am I supposed to turn where the steel crosses the glass?",
      stairs: "Next flight, then ask? Or ask before the next flight?"
    }
  },
  {
    id: "caretaker",
    label: "The caretaker",
    place: "Fourth-floor landing",
    title: "The Rail After the Cloth Passes",
    paragraphs: [
      "Fourth-floor landing. Left rail: done. Inner bars: still a thumbprint near the bottom joint. Floor edge: a little grit against the wall. I fold the cloth once more, work it around the joint, then turn the dirty side in. The bucket handle taps the railing when I set it down. Too full to carry one-handed without the water slopping over the rim.",
      "Above: white pipes tucked under the ironwork. Dust along the elbow, out of reach from this step. Leave it for the long brush. Right-hand glass: one high mark, behind the steel that crosses it. Not a job to do leaning out. I add it to the list on the folded paper in my pocket. Below: a shoe scrapes, stops, scrapes again. Plastic bag against the rail. 3B, back from the store.",
      "A small click comes up the shaft; I hold the bucket still. Ground-floor door closer, probably. No view of the entrance from here. Lower down, a step that stops every few stairs. Not one of ours. Checks before leaving: cloth packed, wet edge wiped, next tread clear. I turn the bucket handle so it won't catch a coat, and leave room beside it for whoever comes around the turn."
    ],
    door: "A small click comes up the shaft; I hold the bucket still.",
    details: {
      railing: "Inner joint: thumbprint gone, cloth folded.",
      pipes: "Dust at the elbow: get the long brush.",
      top: null,
      window: "High mark behind the steel: put it on the list.",
      stairs: "Wet edge wiped, next tread clear."
    }
  }
];
