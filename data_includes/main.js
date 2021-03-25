PennController.ResetPrefix(null) // Shorten command names (keep this line here)
var showProgressBar = false;
//PennController.DebugOff()
PennController.AddHost("https://raw.githubusercontent.com/awpzs/RC_ENG_Priming_RC_Pattern/master/audio/")
PennController.AddHost("https://raw.githubusercontent.com/awpzs/RC_ENG_Priming_RC_Colour/master/images/")

//Sequence( "initRecorder", "exp_block1" ) //for checking recording naming implementation
//Sequence( "initRecorder", "exp_start", "exp_block1", "rest", "exp_block2", "final" ) //for checking lists only
Sequence( "initRecorder", "mic_check_1", "mic_check_2", "setcounter", "information", "survey", "identification", "recording_information", "instruction", "prac", "exp_start", "exp_block1", "rest", "exp_block2", "send", "final" )

InitiateRecorder("https://localhost/pcibex/index.php", "<p>Thank you very much for your interest in participating in this study.</p><p>This experiment involves audio recording, so let us first test if your microphone is working.</p><p><strong>In the following microphone test, you’ll be asked to name aloud two images, while your responses are audio recorded.</strong></p><p>Please grant expt.pcibex.net access to your microphone, by clicking on the link below.</p><p><strong>The recording will start immediately, and you’ll be prompted to name an image aloud.</strong></p><p><strong>You will be able to listen to your response by clicking on “Playback”.</strong></p>").label("initRecorder")
//InitiateRecorder("https://langprolab.stir.ac.uk/pcibex2/index.php", "<p>Thank you very much for your interest in participating in this study.</p><p>This experiment involves audio recording, so let us first test if your microphone is working.</p><p><strong>In the following microphone test, you’ll be asked to name aloud two images, while your responses are audio recorded.</strong></p><p>Please grant expt.pcibex.net access to your microphone, by clicking on the link below.</p><p><strong>The recording will start immediately, and you’ll be prompted to name an image aloud.</strong></p><p><strong>You will be able to listen to your response by clicking on “Playback”.</strong></p>").label("initRecorder")

newTrial("mic_check_1",
    newMediaRecorder("recorder", "audio")
        .record()
    ,
    newText("<p><strong>Microphone check 1</strong></p>")
        .settings.center()
        .print()
    ,
    newText("<p>Please name this image aloud and press “Playback”.</p>")
        .settings.center()
        .print()
    ,
    newImage("apple", "apple.png")
        .settings.center()
        .print()
    ,
    newButton("Playback")
        .settings.center()
        .print()
        .wait()
    ,
    newTimer("wait", 1500)
        .start()
        .wait()
    ,
    getMediaRecorder("recorder")
        .stop()
        .play()
        .wait("playback")
    ,
    clear()
    ,
    newText("<p><strong>Microphone check 1</strong></p>")
        .settings.center()
        .print()
    ,
    newText("<p>If you clearly heard what you said, click on “Continue” to proceed.</p><p>If you could not clearly hear what you said, please check your microphone (e.g., checking Device in Settings), then click on “Continue”.</p>")
        .print()
    ,
    newButton("cont", "Continue")
        .settings.center()
        .print()
        .wait()
)
.log( "ID", PennController.GetURLParameter("id") )

newTrial("mic_check_2",
    newMediaRecorder("recorder", "audio")
        .record()
    ,
    newText("<p><strong>Microphone check 2</strong></p>")
        .settings.center()
        .print()
    ,
    newText("<p>Please name this image and press “Playback”.</p>")
        .settings.center()
        .print()
    ,
    newImage("pineapple", "pineapple.png")
        .settings.center()
        .print()
    ,
    newButton("Playback")
        .settings.center()
        .print()
        .wait()
    ,
    newTimer("wait", 1500)
        .start()
        .wait()
    ,
    getMediaRecorder("recorder")
        .stop()
        .play()
        .wait("playback")
    ,
    clear()
    ,
    newText("<p><strong>Microphone check 2</strong></p>")
        .settings.center()
        .print()
    ,
    newText("<p>If you clearly heard what you said, click on “Continue” to proceed. This will take you to the information sheet of this study.</p><p><strong>If you could not clearly hear what you said, then you cannot take part in this study, as we cannot record your responses.</strong></p><p>Please quit this experiment now, by clicking on the X on the “Experiment” page tab. Thank you very much for your interest in this study.</p>")
        .print()
    ,
    newButton("cont", "Continue")
        .settings.center()
        .print()
        .wait()
)
.log( "ID", PennController.GetURLParameter("id") )

PennController.SetCounter( "setcounter" )

newTrial( "information" ,
    newHtml("information", "information.html")
        .print()
        .log()
    ,
    newButton("Continue")
        .settings.center()
        .print()
        .wait(getHtml("information").test.complete()
            .failure(getHtml("information").warn()))
)

newTrial( "survey" ,
    newHtml("questionnaire", "survey.html")
        .print()
        .log()
    ,
    newButton("Start")
        .settings.center()
        .print()
        .wait(getHtml("questionnaire").test.complete()
            .failure(getHtml("questionnaire").warn()))
)
.log( "ID", PennController.GetURLParameter("id") )

newTrial( "identification" ,
    newText("<p>Below is your Prolific ID for this experiment.</p><p>Please take a note of it in case you need it as a reference.</p><p>Press <strong>Continue</strong> to proceed.</p>")
        .print()
    ,
    newTextInput("inputID", GetURLParameter("id"))
        .settings.center()
        .log("final")
        .print()
    ,
    newButton("Continue")
        .settings.center()
        .print()
        .wait()
//    ,
//    newVar("ID")
//        .global()
//        .set( getTextInput("inputID") )
)
.log( "ID" , GetURLParameter("id") )

newTrial("recording_information" ,
    newText("<p><strong>Important:</strong></p><p>You will hear audio descriptions during the experiment, so please adjust the sound volume to a comfortable level before starting the experiment.</p><p>Your responses will be audio recorded during the experiment. Please complete this experiment in a quiet place.</p><p>Please stay focused during the experiment, and finish it in one go. You will be able to take a brief break (1-2 mins), where specified.</p><p>You will not be able to return to this study if you closed or refreshed this webpage.</p>")
        .print()
    ,
    newButton("Continue")
        .settings.center()
        .print()
        .wait()    
)

Template(
    GetTable("instructions.csv")
            .setGroupColumn("list")
            //.filter( variable => variable.list == 1 ) 
            , variable =>
            newTrial( "instruction" ,
                newHtml("information", variable.insPage)
                    .print()
            ,
            newButton("Continue")
                .settings.center()
                .print()
                .wait(getHtml("information").test.complete()
                    .failure(getHtml("information").warn()))
  )
  .log( "ID"     , GetURLParameter("id")    )
)

newTrial("prac_start",
        newText("<p>We now proceed to the experiment.</p><p>From now on, you won’t be able to playback your responses.</p><p>Please press “Continue” to proceed.</p>")
            .settings.center()
            .print()
        ,
        newButton("Continue")
            .settings.center()
            .print()
            .wait()
        
)

Template(
    GetTable("prac.csv")
            .setGroupColumn("list")
            //.filter( variable => variable.list == 1 ) 
            , variable =>
    newTrial( "prac" ,
            newText("prac_item", variable.item)
            ,
            newImage("1", variable.pos1)
                .size(170,170)
            ,
            newImage("2", variable.pos2)
                .size(170,170)
            ,
            newImage("3", variable.pos3)
                .size(170,170)
            ,
            newImage("4", variable.pos4)
                .size(170,170)
            ,
            newImage("5", variable.pos5)
                .size(170,170)
            ,
            newImage("6", variable.pos6)
                .size(170,170)
            ,
            newImage("7", variable.pos7)
                .size(170,170)
            ,
            newImage("8", variable.pos8)
                .size(170,170)
            ,
            newCanvas(700,350)
                .center()
                .add(0, 0, getImage("1") )
                .add(175, 0, getImage("2") )
                .add(350, 0, getImage("3") )
                .add(525, 0, getImage("4") )
                .add(0, 175, getImage("5") )
                .add(175, 175, getImage("6") )
                .add(350, 175, getImage("7") )
                .add(525, 175, getImage("8") )
                .print()
            ,
            getText("prac_item").test.text("p1")
            	.success(newText("In every trial, you’ll see a display of 8 objects. Here you’ve just heard&nbsp;")
                	.settings.after(newText("&ldquo;"))
                	.settings.after(newText("prime_description", variable.prime_description).bold().settings.center())
                	.settings.after(newText("&#8221;."))
                	.settings.center()
                	.print()            
            		,
            		newText("Please click on the object described. You cannot change your response, so please listen carefully.")
                 	.settings.center()
                 	.print())
                 .failure(newText("Listen carefully. Click on the object described.")
                    .settings.center()
                    .print())            
            ,
            newTimer("delay", 2000)
                .start()
                .wait()
            ,
            newAudio("description", variable.audio)
                .play()
            ,
            newSelector("imgSelect")
                .add( getImage("1") , getImage("2"), getImage("3"), getImage("4"),
                      getImage("5") , getImage("6"), getImage("7"), getImage("8") )
                .log()
                .wait()                        
            ,
            getAudio("description")
                .wait("first")
            ,
            clear()
            ,
            newText("production", "<p>Now it’s your turn - please describe the object that’s in the box, so that your listener can identify the object.</p><p>When you finished describing the object, click on “Proceed” to proceed.</p>")
            ,
            newVar("box", variable.boxPos)
            ,
            newMediaRecorder("recorder", "audio")
                .record()
            ,
            getVar("box").test.is("1")
                .success(getImage("1").css("border", "solid 1px black"))
                .failure(getImage("1"))
            ,
            getVar("box").test.is("2")
                .success(getImage("2").css("border", "solid 1px black"))
                .failure(getImage("2"))
            ,
            getVar("box").test.is("3")
                .success(getImage("3").css("border", "solid 1px black"))
                .failure(getImage("3"))
            ,
            getVar("box").test.is("4")
                .success(getImage("4").css("border", "solid 1px black"))
                .failure(getImage("4"))
            ,
            getVar("box").test.is("5")
                .success(getImage("5").css("border", "solid 1px black"))
                .failure(getImage("5"))
            ,
            getVar("box").test.is("6")
                .success(getImage("6").css("border", "solid 1px black"))
                .failure(getImage("6"))
            ,
            getVar("box").test.is("7")
                .success(getImage("7").css("border", "solid 1px black"))
                .failure(getImage("7"))
            ,
            getVar("box").test.is("8")
                .success(getImage("8").css("border", "solid 1px black"))
                .failure(getImage("8"))
            ,
            newButton("proc", "Proceed")
            ,
            newCanvas(700,500)
                .center()
                .add(0, 0, getImage("1") )
                .add(175, 0, getImage("2") )
                .add(350, 0, getImage("3") )
                .add(525, 0, getImage("4") )
                .add(0, 175, getImage("5") )
                .add(175, 175, getImage("6") )
                .add(350, 175, getImage("7") )
                .add(525, 175, getImage("8") )
                .add(40, 355, getText("production"))
                .add(325, 455, getButton("proc"))
                .print()
            ,
            newSelector()
                .add(getButton("proc"))
                .log()
                .wait()
            ,
            newTimer("wait", 1500)
                .start()
                .wait()
            ,
            getMediaRecorder("recorder")
                .stop()
            ,
            getMediaRecorder("recorder").test.recorded()
                .failure(newText("Sorry, there seems to be something wrong with your microphone. Please stop the experiment, and contact the researcher.").settings.center().print())
            ,
            clear()
            ,
            getText("prac_item").test.text("p1")
                .success(newText("You may say ")
                                .settings.after(newText(variable.targetRC1).bold())
                                .settings.after(newText(",&nbsp;"))
                                .settings.after(newText(variable.targetRC2).bold())
                                .settings.after(newText(",&nbsp;"))
                                .settings.after(newText(variable.targetPC).bold())
                                .settings.after(newText("&nbsp;or&nbsp;"))
                                .settings.after(newText(variable.targetCP).bold())
                                .settings.after(newText("."))
                                .print()
                            ,
                            newText("But avoid mentioning the location ").bold()
                                .settings.after(newText("(e.g., "))
                                .settings.after(newText(variable.targetSP))
                                .settings.after(newText(")."))
                                .print()
                            ,
                            newText("The objects may be positioned differently for your listener.")
                                .print())
                .failure(newText("As before, you may say ")
                            .settings.after(newText(variable.targetRC1).bold())
                            .settings.after(newText(",&nbsp;"))
                            .settings.after(newText(variable.targetRC2).bold())
                            .settings.after(newText(",&nbsp;"))
                            .settings.after(newText(variable.targetPC).bold())
                            .settings.after(newText("&nbsp;or&nbsp;"))
                            .settings.after(newText(variable.targetCP).bold())
                            .settings.after(newText("."))
                            .print()
                            ,
                            newText("But avoid mentioning the location ").bold()
                                .settings.after(newText("(e.g., "))
                                .settings.after(newText(variable.targetSP))
                                .settings.after(newText(")."))
                                .print()
                            ,
                            newText("The objects may be arranged differently for your listener.")
                                .print())
            ,
            newButton("Continue")
                .settings.center()
                .print()
                .wait()
    )
  .log( "ID", GetURLParameter("id")    )
)

Template(
    GetTable("fulldesign.csv")
            .setGroupColumn("list").filter(variable => variable.order < 46)
            //.filter( variable => variable.list == 1 ) 
            , variable =>
    		newTrial( "exp_block1" ,
            	newText("exp_item", variable.item)
            	,
            	newImage("1", variable.pos1)
            	    .size(170,170)
            	,
            	newImage("2", variable.pos2)
                	.size(170,170)
            	,
            	newImage("3", variable.pos3)
                	.size(170,170)
            	,
            	newImage("4", variable.pos4)
                	.size(170,170)
            	,
            	newImage("5", variable.pos5)
                	.size(170,170)
            	,
            	newImage("6", variable.pos6)
                	.size(170,170)
            	,
            	newImage("7", variable.pos7)
                	.size(170,170)
            	,
            	newImage("8", variable.pos8)
                	.size(170,170)
            	,
            	newCanvas(700,350)
                	.center()
                	.add(0, 0, getImage("1") )
                	.add(175, 0, getImage("2") )
                	.add(350, 0, getImage("3") )
                	.add(525, 0, getImage("4") )
                	.add(0, 175, getImage("5") )
                	.add(175, 175, getImage("6") )
                	.add(350, 175, getImage("7") )
                	.add(525, 175, getImage("8") )
                	.print()
            	,
            	newTimer("delay", 2000)
                	.start()
                	.wait()
            	,
            	newAudio("description", variable.audio)
                	.play()
            	,
            	newSelector("imgSelect")
                	.add( getImage("1") , getImage("2"), getImage("3"), getImage("4"),
                	      getImage("5") , getImage("6"), getImage("7"), getImage("8") )
                	.log()
                	.wait()
            	,
            	getAudio("description")
                	.wait("first")
            	,
            	clear()
            	,
            	newVar("box", variable.boxPos)
            	,
            	newMediaRecorder(variable.recordingName+'_'+GetURLParameter("id"), "audio")
                	.record()
            	,
            	getVar("box").test.is("1")
                	.success(getImage("1").css("border", "solid 1px black"))
                	.failure(getImage("1"))
            	,
            	getVar("box").test.is("2")
                	.success(getImage("2").css("border", "solid 1px black"))
                	.failure(getImage("2"))
            	,
            	getVar("box").test.is("3")
                	.success(getImage("3").css("border", "solid 1px black"))
                	.failure(getImage("3"))
            	,
            	getVar("box").test.is("4")
                	.success(getImage("4").css("border", "solid 1px black"))
                	.failure(getImage("4"))
            	,
            	getVar("box").test.is("5")
                	.success(getImage("5").css("border", "solid 1px black"))
                	.failure(getImage("5"))
            	,
            	getVar("box").test.is("6")
                	.success(getImage("6").css("border", "solid 1px black"))
                	.failure(getImage("6"))
            	,
            	getVar("box").test.is("7")
                	.success(getImage("7").css("border", "solid 1px black"))
                	.failure(getImage("7"))
            	,
            	getVar("box").test.is("8")
                	.success(getImage("8").css("border", "solid 1px black"))
                	.failure(getImage("8"))
            	,
            	newButton("proc", "Proceed")
            	,
            	newCanvas(700,500)
                	.center()
                	.add(0, 0, getImage("1") )
                	.add(175, 0, getImage("2") )
                	.add(350, 0, getImage("3") )
                	.add(525, 0, getImage("4") )
                	.add(0, 175, getImage("5") )
                	.add(175, 175, getImage("6") )
                	.add(350, 175, getImage("7") )
                	.add(525, 175, getImage("8") )
                	.add(300, 365, getButton("proc"))
                	.print()
            	,
            	newSelector()
                	.add(getButton("proc"))
                	.log()
                	.wait()
            	,
            	newTimer("wait", 1500)
                	.start()
                	.wait()
            	,
            	getMediaRecorder(variable.recordingName+'_'+GetURLParameter("id"))
                	.stop()
            	,
            	getMediaRecorder(variable.recordingName+'_'+GetURLParameter("id")).test.recorded()
                	.failure(newText("Sorry, there seems to be something wrong with your microphone. Please stop the experiment, and contact the researcher.").settings.center().print())
    )
    .log("ID", GetURLParameter("id")    )
    .log("List", variable.list)
    .log("Order", variable.order)
    .log("Item", variable.item)
    .log("Condition", variable.condition)
    .log("Concept", variable.concept)
    .log("Prime", variable.prime)
    .log("Repetition", variable.colour_repetition)
    .log("PrimeDescription", variable.prime_description)
    .log("TargetDescription", variable.target_description)
    .log("TargetObject", variable.target_object)
    .log("RepeatedPrime", variable.distractor6_repeated_prime_DiffN_SameC_DiffP)
    .log("NonRepeatedPrime", variable.distractor7_non_repeated_prime_DiffN_DiffC_DiffP
    )
    .log("ExpTrials", variable.expTrials)
    .log("PrimePosition", variable.targetImg)
    .log("TargetPosition", variable.boxPos)
)

newTrial( "rest" ,
    newText("<p>Now you can take a break (1-2 mins).</p><p>Press <strong>Continue</strong> when you are ready.</p>")
        .print()
    ,
    newButton("Continue")
        .settings.center()
        .print()
        .wait()
)
.log( "ID" , GetURLParameter("id") )

Template(
    GetTable("fulldesign.csv")
            .setGroupColumn("list").filter(variable => variable.order > 45)
            //.filter( variable => variable.list == 1 ) 
            , variable =>
    		newTrial( "exp_block2" ,
            	newText("exp_item", variable.item)
            	,
            	newImage("1", variable.pos1)
            	    .size(170,170)
            	,
            	newImage("2", variable.pos2)
                	.size(170,170)
            	,
            	newImage("3", variable.pos3)
                	.size(170,170)
            	,
            	newImage("4", variable.pos4)
                	.size(170,170)
            	,
            	newImage("5", variable.pos5)
                	.size(170,170)
            	,
            	newImage("6", variable.pos6)
                	.size(170,170)
            	,
            	newImage("7", variable.pos7)
                	.size(170,170)
            	,
            	newImage("8", variable.pos8)
                	.size(170,170)
            	,
            	newCanvas(700,350)
                	.center()
                	.add(0, 0, getImage("1") )
                	.add(175, 0, getImage("2") )
                	.add(350, 0, getImage("3") )
                	.add(525, 0, getImage("4") )
                	.add(0, 175, getImage("5") )
                	.add(175, 175, getImage("6") )
                	.add(350, 175, getImage("7") )
                	.add(525, 175, getImage("8") )
                	.print()
            	,
            	newTimer("delay", 2000)
                	.start()
                	.wait()
            	,
            	newAudio("description", variable.audio)
                	.play()
            	,
            	newSelector("imgSelect")
                	.add( getImage("1") , getImage("2"), getImage("3"), getImage("4"),
                	      getImage("5") , getImage("6"), getImage("7"), getImage("8") )
                	.log()
                	.wait()
            	,
            	getAudio("description")
                	.wait("first")
            	,
            	clear()
            	,
            	newVar("box", variable.boxPos)
            	,
            	newMediaRecorder(variable.recordingName+'_'+GetURLParameter("id"), "audio")
                	.record()
            	,
            	getVar("box").test.is("1")
                	.success(getImage("1").css("border", "solid 1px black"))
                	.failure(getImage("1"))
            	,
            	getVar("box").test.is("2")
                	.success(getImage("2").css("border", "solid 1px black"))
                	.failure(getImage("2"))
            	,
            	getVar("box").test.is("3")
                	.success(getImage("3").css("border", "solid 1px black"))
                	.failure(getImage("3"))
            	,
            	getVar("box").test.is("4")
                	.success(getImage("4").css("border", "solid 1px black"))
                	.failure(getImage("4"))
            	,
            	getVar("box").test.is("5")
                	.success(getImage("5").css("border", "solid 1px black"))
                	.failure(getImage("5"))
            	,
            	getVar("box").test.is("6")
                	.success(getImage("6").css("border", "solid 1px black"))
                	.failure(getImage("6"))
            	,
            	getVar("box").test.is("7")
                	.success(getImage("7").css("border", "solid 1px black"))
                	.failure(getImage("7"))
            	,
            	getVar("box").test.is("8")
                	.success(getImage("8").css("border", "solid 1px black"))
                	.failure(getImage("8"))
            	,
            	newButton("proc", "Proceed")
            	,
            	newCanvas(700,500)
                	.center()
                	.add(0, 0, getImage("1") )
                	.add(175, 0, getImage("2") )
                	.add(350, 0, getImage("3") )
                	.add(525, 0, getImage("4") )
                	.add(0, 175, getImage("5") )
                	.add(175, 175, getImage("6") )
                	.add(350, 175, getImage("7") )
                	.add(525, 175, getImage("8") )
                	.add(300, 365, getButton("proc"))
                	.print()
            	,
            	newSelector()
                	.add(getButton("proc"))
                	.log()
                	.wait()
            	,
            	newTimer("wait", 1500)
                	.start()
                	.wait()
            	,
            	getMediaRecorder(variable.recordingName+'_'+GetURLParameter("id"))
                	.stop()
            	,
            	getMediaRecorder(variable.recordingName+'_'+GetURLParameter("id")).test.recorded()
                	.failure(newText("Sorry, there seems to be something wrong with your microphone. Please stop the experiment, and contact the researcher.").settings.center().print())
    )
    .log("ID", GetURLParameter("id")    )
    .log("List", variable.list)
    .log("Order", variable.order)
    .log("Item", variable.item)
    .log("Condition", variable.condition)
    .log("Concept", variable.concept)
    .log("Prime", variable.prime)
    .log("Repetition", variable.colour_repetition)
    .log("PrimeDescription", variable.prime_description)
    .log("TargetDescription", variable.target_description)
    .log("TargetObject", variable.target_object)
    .log("RepeatedPrime", variable.distractor6_repeated_prime_DiffN_SameC_DiffP)
    .log("NonRepeatedPrime", variable.distractor7_non_repeated_prime_DiffN_DiffC_DiffP
    )
    .log("ExpTrials", variable.expTrials)
    .log("PrimePosition", variable.targetImg)
    .log("TargetPosition", variable.boxPos)
)

SendResults( "send" )

newTrial( "final" ,
    newText("<p>Thank you very much for your participation!</p>")
        .print()
    ,
    newText("<p>If you were asked to download a copy of the recordings on the last page, please send the file and your Prolific ID to <strong>kumiko.fukumura[at]stir.ac.uk.</strong></p><p>Otherwise, please click on the link below to validate your participation.</p>")
        .print()
    ,
    newText("<p><a href='https://app.prolific.co/submissions/complete?cc=520E9FBA'>Click here to validate your participation and finish the experiment</a></p>")
        .settings.center()
        .print()
    ,
    newText("<p>Please see below for a debriefing of this study.</p>")
        .settings.center()
        .print()
    ,
    newHtml("debriefing", "debrief.html")
        .print()
    ,
    newButton("void")
        .wait()
)
