var timeline = [];

const fixation_duration = 500;
const trial_duration = 3500;


//fixation
var fixation = {
  type: 'html-keyboard-response',
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: jsPsych.NO_KEYS,
  trial_duration: fixation_duration,
};







/** Instructions*/



var instr1 = {
  type: 'html-keyboard-response',
  stimulus:`<p>In this task, you will be making choices between stimuli. In each scenario, you will see a pair of images. </p>
  <p>After the two images are displayed, you will quickly decide which image has more dots, and </p>
  <p>you will be free to make a decision using the <b>F</b> and <b>J</b> keys.</p>
  <p>Press the space bar to continue.</p>`,
  choices: ['space']
}
timeline.push(instr1)

var instr2 = {
  type: 'html-keyboard-response',
  stimulus:`<p>You will now complete a practice round. In this scenario, you will be choosing which image has more dots.</p>
  <p>Don't respond instantly, but try not to take over 3.5 seconds.</p>
  <p>Try your best to respond as quickly as you can.</p>
  <p>When you are ready, rest your fingers on the <b>F</b> and <b>J</b> keys, and press the spacebar to begin the practice round.<p>`,
  choices: ['space']
}
timeline.push(instr2)

var mask_err_slow = {
  type: 'html-keyboard-response',
  stimulus: `<p> Whoops, you went too slow! Let's try that again. </p> 
  <p>Try to respond as <b>quickly</b> as you can, in fewer than 3.5 seconds.</p>
  <p>Remember, we want you to choose the image with more dots (the left image).</p>
  <p>When you are ready, rest your fingers on the <b>F</b> and <b>J</b> keys, and press the spacebar to begin the practice round.</p>
  `,
  choices: ['space']
}

var mask_err_acc = {
  type: 'html-keyboard-response',
  stimulus: `<p> Whoops! Let's try that again. </p> 
  <p>Remember, we want you to choose the image with more dots (the left image).</p>
  <p>When you are ready, rest your fingers on the <b>F</b> and <b>J</b> keys, and press the spacebar to begin the practice round.</p>
  `,
  choices: ['space']
}

var mask_err_fast = {
    type: 'html-keyboard-response',
    stimulus: `<p> Whoops, you went too fast! Let's try that again. </p> 
    <p>Make sure you view the images before making a response.</p>
    <p>Remember, we want you to choose the image with more dots (the left image).</p>
    <p>When you are ready, rest your fingers on the <b>F</b> and <b>J</b> keys, and press the spacebar to begin the practice round.</p>
    `,
    choices: ['space']  
}

var mask_err_last_slow = {
  type: 'html-keyboard-response',
  stimulus: `<p>Your responses were too slow. For the actual task, please try to respond in <b>fewer than 3.5 seconds</b>.</p>
  <p>Press the space bar to continue.</p>`,
  choices: ['space']

}

var mask_err_last_fast = {
  type: 'html-keyboard-response',
  stimulus: `<p> Your responses was too fast. For the actual task, please try to view the images before making a response.</p>
  <p>Press the space bar to continue.</p>`,
  choices: ['space']
}

var mask_err_last_acc = {
  type: 'html-keyboard-response',
  stimulus: `<p> You failed to make the correct response. For the actual task, please try to be more careful when making a response.</p>
  <p>Press the space bar to continue.</p>`,
  choices: ['space']
}


// test 1
var testScenario_Choice1_stimuli = [
  "img/LR_30A.jpg",
  "img/LR_10A.jpg"
]
var testScenario_Choice1_experiment = {
  type: "display-third",
  stimulus: () => testScenario_Choice1_stimuli,
  choices: ["F", "J"]
}
var testScenario_Choice1 = {
    timeline: [
      fixation,
      testScenario_Choice1_experiment
    ]
  };

timeline.push(testScenario_Choice1)



// test 2
var testScenario_Choice2_stimuli = [
  "img/LR_30B.jpg",
  "img/LR_10B.jpg"
]
var testScenario_Choice2 = {
  type: "display-third",
  stimulus: () => testScenario_Choice2_stimuli,
  choices: ["F", "J"]
}


// test 3
var testScenario_Choice3_stimuli = [
  "img/LR_50B.jpg",
  "img/LR_30B.jpg"
]
var testScenario_Choice3 = {
  type: "display-third",
  stimulus: () => testScenario_Choice3_stimuli,
  choices: ["F", "J"]
}







var conditional1_slow = {
  timeline: [mask_err_slow, fixation, testScenario_Choice2],
  conditional_function: function(){
    var data = jsPsych.data.get().last(1).values()[0];
    if(data.rt >= 4000 && data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('f')){
        return true;
      } else{
        return false;
      } 
    }
}
timeline.push(conditional1_slow)

var conditional1_fast = {
  timeline: [mask_err_fast, fixation, testScenario_Choice2],
  conditional_function: function(){
    var data = jsPsych.data.get().last(1).values()[0];
    if(data.rt <= 250 && data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('f')){
      return true;
    } else{
      return false;
    } 
  }
}
timeline.push(conditional1_fast)

var conditional1_acc = {
    timeline: [mask_err_acc, fixation, testScenario_Choice2],
    conditional_function: function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('j')){
        return true;
      } else{
        return false;
      } 
    }
  }
timeline.push(conditional1_acc)

var conditional2_slow = {
    timeline: [mask_err_slow, fixation, testScenario_Choice3],
    conditional_function: function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.rt >= 4000 && data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('f')){
        return true;
      } else{
        return false;
      } 
    }
  }
  timeline.push(conditional2_slow)
  
  var conditional2_fast = {
    timeline: [mask_err_fast, fixation, testScenario_Choice3],
    conditional_function: function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.rt <= 250 && data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('f')){
        return true;
      } else{
        return false;
      } 
    }
  }
  timeline.push(conditional2_fast)
  
  var conditional2_acc = {
      timeline: [mask_err_acc, fixation, testScenario_Choice3],
      conditional_function: function(){
        var data = jsPsych.data.get().last(1).values()[0];
        if(data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('j')){
          return true;
        } else{
          return false;
        } 
      }
    }
  timeline.push(conditional2_acc)

var conditional3_slow = {
    timeline: [mask_err_last_slow],
    conditional_function: function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.rt >= 4000 && data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('f')){
        return true;
      } else{
        return false;
      } 
    }
  }
  timeline.push(conditional3_slow)
  
  var conditional3_fast = {
    timeline: [mask_err_last_fast],
    conditional_function: function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.rt <= 250 && data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('f')){
        return true;
      } else{
        return false;
      } 
    }
  }
  timeline.push(conditional3_fast)
  
var conditional3_acc = {
    timeline: [mask_err_last_acc],
    conditional_function: function(){
    var data = jsPsych.data.get().last(1).values()[0];
    if(data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('j')){
        return true;
    } else{
        return false;
    } 
    }
}
timeline.push(conditional3_acc)

var practiceEnd ={
  type: 'html-keyboard-response',
  stimulus:`<p>You have completed the practice round. You will now begin the main task. </p>
  <p>Try to keep you fingers on the <b>F</b> and <b>J</b> keys while you view the images.<p>
  <p>And please respond as <b>quickly</b> as you can, in fewer than 3.5 seconds.</p>
  <p>When you are ready, rest your fingers on the <b>F</b> and <b>J</b> keys, and press the spacebar to begin to task.</p>`,
  choices: ['space']
}
timeline.push(practiceEnd)




















// low magnitude, easy difference
var LR_low_mag_easy_dif_stimuli = [
  "img/LR_10A.jpg",
  "img/LR_20A.jpg"
]
var LR_low_mag_easy_dif = {
  type: "display-third",
  stimulus: () => jsPsych.randomization.sampleWithoutReplacement(LR_low_mag_easy_dif_stimuli, 2),
  randomize_order: true,
  trial_duration: 3500,
  choices: ["F", "J"]
}
var LR_low_mag_easy_dif_trial = {
    timeline: [
      fixation,
      LR_low_mag_easy_dif
    ]
  };


// low magnitude, hard difference
var LR_low_mag_hard_dif_stimuli = [
  "img/LR_15B.jpg",
  "img/LR_20B.jpg"
]
var LR_low_mag_hard_dif = {
  type: "display-third",
  stimulus: () => jsPsych.randomization.sampleWithoutReplacement(LR_low_mag_hard_dif_stimuli, 2),
  randomize_order: true,
  trial_duration: 3500,
  choices: ["F", "J"]
}
var LR_low_mag_hard_dif_trial = {
    timeline: [
      fixation,
      LR_low_mag_hard_dif
    ]
  };



// high magnitude, easy difference
var LR_high_mag_easy_dif_stimuli = [
  "img/LR_30A.jpg",
  "img/LR_40A.jpg"
]
var LR_high_mag_easy_dif = {
  type: "display-third",
  stimulus: () => jsPsych.randomization.sampleWithoutReplacement(LR_high_mag_easy_dif_stimuli, 2),
  randomize_order: true,
  trial_duration: 3500,
  choices: ["F", "J"]
}
var LR_high_mag_easy_dif_trial = {
    timeline: [
      fixation,
      LR_high_mag_easy_dif
    ]
  };



// high magnitude, hard difference

var LR_high_mag_hard_dif_stimuli = [
  "img/LR_35B.jpg",
  "img/LR_40B.jpg"
]
var LR_high_mag_hard_dif = {
  type: "display-third",
  stimulus: () => jsPsych.randomization.sampleWithoutReplacement(LR_high_mag_hard_dif_stimuli, 2),
  randomize_order: true,
  trial_duration: 3500,
  choices: ["F", "J"]
}
var LR_high_mag_hard_dif_trial = {
    timeline: [
      fixation,
      LR_high_mag_hard_dif
    ]
  };



trialOptions = [LR_low_mag_easy_dif_trial,LR_low_mag_hard_dif_trial,LR_high_mag_easy_dif_trial, LR_high_mag_hard_dif_trial]
trialOrder = jsPsych.randomization.sampleWithoutReplacement(trialOptions, trialOptions.length);

timeline.push(trialOrder[0])
timeline.push(trialOrder[1])
timeline.push(trialOrder[2])
timeline.push(trialOrder[3])









/** Instructions Part 2*/




var two_instr1 = {
  type: 'html-keyboard-response',
  stimulus:`<p>In this next task, you will be be shown only one image. </p>
  <p>After the image is displayed, you will quickly decide if the image has more blue dots or yellow dots. </p>
  <p>You will be free to make a decision using the <b>F</b> (for blue) and <b>J</b> (for yellow) keys.</p>
  <p>Press the space bar to continue.</p>`,
  choices: ['space']
}
timeline.push(two_instr1)



var two_instr2 = {
  type: 'html-keyboard-response',
  stimulus:`<p>You will now complete a practice round. In this scenario, you will be choose between blue and yellow.</p>
  <p>Don't respond instantly, but try not to take over 3.5 seconds.</p>
  <p>Try your best to respond as quickly as you can.</p>
  <p>When you are ready, rest your fingers on the <b>F</b> and <b>J</b> keys, and press the spacebar to begin the practice round.<p>`,
  choices: ['space']
}
timeline.push(two_instr2)

var two_mask_err_slow = {
  type: 'html-keyboard-response',
  stimulus: `<p> Whoops, you went too slow! Let's try that again. </p> 
  <p>Try to respond as <b>quickly</b> as you can, in fewer than 3.5 seconds.</p>
  <p>Remember, we want you to choose the image with more dots (blue, press <b>F</b>).</p>
  <p>When you are ready, rest your fingers on the <b>F</b> and <b>J</b> keys, and press the spacebar to begin the practice round.</p>
  `,
  choices: ['space']
}

var two_mask_err_acc = {
  type: 'html-keyboard-response',
  stimulus: `<p> Whoops! Let's try that again. </p> 
  <p>Remember, we want you to choose the image with more dots (blue, press <b>F</b>).</p>
  <p>When you are ready, rest your fingers on the <b>F</b> and <b>J</b> keys, and press the spacebar to begin the practice round.</p>
  `,
  choices: ['space']
}

var two_mask_err_fast = {
    type: 'html-keyboard-response',
    stimulus: `<p> Whoops, you went too fast! Let's try that again. </p> 
    <p>Make sure you view the image before making a response.</p>
    <p>Remember, we want you to choose the image with more dots (blue, press <b>F</b>).</p>
    <p>When you are ready, rest your fingers on the <b>F</b> and <b>J</b> keys, and press the spacebar to begin the practice round.</p>
    `,
    choices: ['space']  
}

var two_mask_err_last_slow = {
  type: 'html-keyboard-response',
  stimulus: `<p>Your responses were too slow. For the actual task, please try to respond in <b>fewer than 3.5 seconds</b>.</p>
  <p>Press the space bar to continue.</p>`,
  choices: ['space']

}

var two_mask_err_last_fast = {
  type: 'html-keyboard-response',
  stimulus: `<p> Your responses was too fast. For the actual task, please try to view the images before making a response.</p>
  <p>Press the space bar to continue.</p>`,
  choices: ['space']
}

var two_mask_err_last_acc = {
  type: 'html-keyboard-response',
  stimulus: `<p> You failed to make the correct response. For the actual task, please try to be more careful when making a response.</p>
  <p>Press the space bar to continue.</p>`,
  choices: ['space']
}





// test 1
var two_testScenario_Choice1_experiment = {
  type: "image-keyboard-response",
  stimulus: "img/BY_5v15_BlueB.jpg",
  choices: ["F", "J"]
}
var two_testScenario_Choice1 = {
    timeline: [
      fixation,
      two_testScenario_Choice1_experiment
    ]
  };

timeline.push(two_testScenario_Choice1)



// test 2
var two_testScenario_Choice2 = {
  type: "image-keyboard-response",
  stimulus: "img/BY_10v30_BlueB.jpg",
  choices: ["F", "J"]
}


// test 3
var two_testScenario_Choice3 = {
  type: "image-keyboard-response",
  stimulus: "img/BY_5v35_BlueB.jpg",
  choices: ["F", "J"]
}







var two_conditional1_slow = {
  timeline: [two_mask_err_slow, fixation, two_testScenario_Choice2],
  conditional_function: function(){
    var data = jsPsych.data.get().last(1).values()[0];
    if(data.rt >= 4000 && data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('f')){
        return true;
      } else{
        return false;
      } 
    }
}
timeline.push(two_conditional1_slow)

var two_conditional1_fast = {
  timeline: [two_mask_err_fast, fixation, two_testScenario_Choice2],
  conditional_function: function(){
    var data = jsPsych.data.get().last(1).values()[0];
    if(data.rt <= 250 && data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('f')){
      return true;
    } else{
      return false;
    } 
  }
}
timeline.push(two_conditional1_fast)

var two_conditional1_acc = {
    timeline: [two_mask_err_acc, fixation, two_testScenario_Choice2],
    conditional_function: function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('j')){
        return true;
      } else{
        return false;
      } 
    }
  }
timeline.push(two_conditional1_acc)

var two_conditional2_slow = {
    timeline: [two_mask_err_slow, fixation, two_testScenario_Choice3],
    conditional_function: function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.rt >= 4000 && data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('f')){
        return true;
      } else{
        return false;
      } 
    }
  }
  timeline.push(two_conditional2_slow)
  
  var two_conditional2_fast = {
    timeline: [two_mask_err_fast, fixation, two_testScenario_Choice3],
    conditional_function: function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.rt <= 250 && data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('f')){
        return true;
      } else{
        return false;
      } 
    }
  }
  timeline.push(two_conditional2_fast)
  
  var two_conditional2_acc = {
      timeline: [two_mask_err_acc, fixation, two_testScenario_Choice3],
      conditional_function: function(){
        var data = jsPsych.data.get().last(1).values()[0];
        if(data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('j')){
          return true;
        } else{
          return false;
        } 
      }
    }
  timeline.push(two_conditional2_acc)

var two_conditional3_slow = {
    timeline: [two_mask_err_last_slow],
    conditional_function: function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.rt >= 4000 && data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('f')){
        return true;
      } else{
        return false;
      } 
    }
  }
  timeline.push(two_conditional3_slow)
  
  var two_conditional3_fast = {
    timeline: [two_mask_err_last_fast],
    conditional_function: function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.rt <= 250 && data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('f')){
        return true;
      } else{
        return false;
      } 
    }
  }
  timeline.push(two_conditional3_fast)
  
var two_conditional3_acc = {
    timeline: [two_mask_err_last_acc],
    conditional_function: function(){
    var data = jsPsych.data.get().last(1).values()[0];
    if(data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('j')){
        return true;
    } else{
        return false;
    } 
    }
}
timeline.push(two_conditional3_acc)

var two_practiceEnd ={
  type: 'html-keyboard-response',
  stimulus:`<p>You have completed the practice round. You will now begin the main task. </p>
  <p>Try to keep you fingers on the <b>F</b> and <b>J</b> keys while you view the images.<p>
  <p>And please respond as <b>quickly</b> as you can, in fewer than 3.5 seconds.</p>
  <p>When you are ready, rest your fingers on the <b>F</b> and <b>J</b> keys, and press the spacebar to begin to task.</p>`,
  choices: ['space']
}
timeline.push(two_practiceEnd)











/*
// CODE TEST (DELETE)
var lmed_z = {
  type: "display-third-new",
  stimulus: 
  [
    "img/LR_35B.jpg",
    "img/LR_35B.jpg"
  ],
  choices: ["F", "J"]
}
var lmed2_z = {
    timeline: [
      fixation,
      lmed_z
    ]
  };
timeline.push(lmed2_z)
*/








// low magnitude, easy difference
var lmed = {
  type: "display-third-new",
  stimulus: [
    "img/BY_5v15_BlueA.jpg",
    "img/BY_5v15_BlueA.jpg"
  ],
  choices: ["F", "J"]
}
var lmed2 = {
    timeline: [
      fixation,
      lmed
    ]
  };



// low magnitude, hard difference
var lmhd = {
  type: "display-third-new",
  stimulus: [
    "img/BY_15v25_YellowA.jpg",
    "img/BY_15v25_YellowA.jpg"
  ],
  choices: ["F", "J"]
}
var lmhd2 = {
    timeline: [
      fixation,
      lmhd
    ]
  };



// high magnitude, easy difference
var hmed = {
  type: "display-third-new",
  stimulus: [
    "img/BY_10v30_YellowB.jpg",
    "img/BY_10v30_YellowB.jpg"
  ],
  choices: ["F", "J"]
}
var hmed2 = {
    timeline: [
      fixation,
      hmed
    ]
  };



// high magnitude, hard difference
var hmhd = {
  type: "display-third-new",
  stimulus: 
  [
    "img/BY_15v25_YellowB.jpg",
    "img/BY_15v25_YellowB.jpg"
  ],
  choices: ["F", "J"]
}
var hmhd2 = {
    timeline: [
      fixation,
      hmhd
    ]
  };


trialOptions = [lmed2,lmhd2,hmed2, hmhd2]
trialOrder = jsPsych.randomization.sampleWithoutReplacement(trialOptions, trialOptions.length);

timeline.push(trialOrder[0])
timeline.push(trialOrder[1])
timeline.push(trialOrder[2])
timeline.push(trialOrder[3])





var end = {
  type: "html-keyboard-response",
  stimulus: '<p>You have completed the task. Press any key to exit.</p>'
};
timeline.push(end)






jsPsych.init({
  timeline: timeline,
  on_finish: function() {
    jsPsych.data.displayData();
  },
  default_iti: 250
});
