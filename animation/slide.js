SLib.slideOutLeft = function(element, time, finalize, distance, calculation) {
    if(element == null) {
        console.error("No element in SLib.slideOutLeft");
        return;
    }

    if(time == null)
        time = 250;
    if(typeof finalize != "function")
        finalize = function() {};
    if(typeof calculation != "function")
        calculation = function(percentage) {
			return percentage;
		};
	if(distance == null)
	    distance = 250;

    job = new SLib.animationBackend.basicJob();
    job.element = element;
    job.totalTime = time;
    job.calc = calculation;
    job.customFinalize = finalize;
    
    job.oldLeft      = parseFloat( SLib.cs(element).left  ) || 0.0;
    job.oldRight     = parseFloat( SLib.cs(element).right ) || 0.0;
    job.oldTop       = parseFloat( SLib.cs(element).top ) || 0.0;
    job.startOpacity = parseFloat( SLib.cs(element).opacity ) || 1.0;
    
    job.distance = distance;
    
    /* setup position: */
    job.oldPosition  = SLib.cs(element).position;
    if(SLib.cs(element).position == "fixed") {
        job.startLeft  = job.oldLeft;
        job.startRight = job.oldRight;
    } else {
        job.startLeft  = SLib.getLeft(element);
        job.startRight = job.startLeft + parseFloat( SLib.cs(element).width ); /* +margin+padding ? */
        job.oldTop     = SLib.getTop (element);
        element.style.position = "absolute";
    }

    job.think = function(p) {
        if(p >= 1) {
            p = 1.0;
            this.done = true;
        }
        this.element.style.left    = this.startLeft  + -1*(this.distance*this.calc(p)) +"px";
        this.element.style.right   = this.startRight +    (this.distance*this.calc(p)) +"px";
        this.element.style.opacity = this.startOpacity * (1 - this.calc(p));
    };
    job.finalize = function() {
        this.element.style.display  = "none";
        this.element.style.position = job.oldPosition;
        this.element.style.opacity  = this.startOpacity;
        this.element.style.left     = this.oldLeft;
        this.element.style.right    = this.oldRight;
        this.element.style.top      = this.oldTop;
        
        this.customFinalize();
    };
    
    return job;
}
SLib.slideOutRight = function(element, time, finalize, distance, calculation) {
    if(element == null) {
        console.error("No element in SLib.slideOutRight");
        return;
    }

    if(time == null)
        time = 250;
    if(typeof finalize != "function")
        finalize = function() {};
    if(typeof calculation != "function")
        calculation = function(percentage) {
			return percentage;
		};
	if(distance == null)
	    distance = 250;

    job = new SLib.animationBackend.basicJob();
    job.element = element;
    job.totalTime = time;
    job.calc = calculation;
    job.customFinalize = finalize;
    
    job.oldLeft      = parseFloat( SLib.cs(element).left  ) || 0.0;
    job.oldRight     = parseFloat( SLib.cs(element).right ) || 0.0;
    job.oldTop       = parseFloat( SLib.cs(element).top ) || 0.0;
    job.startOpacity = parseFloat( SLib.cs(element).opacity ) || 1.0;
    
    job.distance = distance;
    
    /* setup position: */
    job.oldPosition  = SLib.cs(element).position;
    if(SLib.cs(element).position == "fixed") {
        job.startLeft  = job.oldLeft;
        job.startRight = job.oldRight;
    } else {
        job.startLeft  = SLib.getLeft(element);
        job.startRight = job.startLeft + parseFloat( SLib.cs(element).width ); /* +margin+padding ? */
        job.oldTop     = SLib.getTop (element);
        element.style.position = "absolute";
    }

    job.think = function(p) {
        if(p >= 1) {
            p = 1.0;
            this.done = true;
        }
        this.element.style.right = this.startRight + -1*(this.distance*this.calc(p)) +"px";
        this.element.style.left  = this.startLeft  +    (this.distance*this.calc(p)) +"px";
        this.element.style.opacity = this.startOpacity * (1 - this.calc(p));
    };
    job.finalize = function() {
        this.element.style.display  = "none";
        this.element.style.position = job.oldPosition;
        this.element.style.opacity  = this.startOpacity;
        this.element.style.left     = this.oldLeft;
        this.element.style.right    = this.oldRight;
        this.element.style.top      = this.oldTop;
        
        this.customFinalize();
    };
    
    return job;
}

SLib.slideInRight = function(element, time, finalize, distance, calculation) {
    if(element == null) {
        console.error("No element in SLib.slideInRight");
        return;
    }

    if(time == null)
        time = 250;
    if(typeof finalize != "function")
        finalize = function() {};
    if(typeof calculation != "function")
        calculation = function(percentage) {
			return percentage;
		};
	if(distance == null)
	    distance = 250;

    job = new SLib.animationBackend.basicJob();
    job.element = element;
    job.totalTime = time;
    job.calc = calculation;
    job.customFinalize = finalize;
    
    job.oldLeft  = parseFloat( SLib.cs(element).left  ) || 0.0;
    job.endOpacity = parseFloat( SLib.cs(element).opacity ) || 1.0;
    element.style.opacity = 0.0; /* no flickering */
    
    job.distance = distance;
    
    if(element.style.display == "none")
        element.style.display = "block";
    
    /* setup position: */
    if( SLib.cs(element).position == "static" ) {
        element.style.position = "relative";
        element.style.left = "0px";
        element.style.right = "0px";
    }

    job.think = function(p) {
        if(p >= 1) {
            p = 1.0;
            this.done = true;
        }
        this.element.style.left  = this.oldLeft  - -1*(this.distance*(1 - this.calc(p))) +"px";
        this.element.style.opacity = this.endOpacity * (this.calc(p));
    };
    job.finalize = function() {
        this.element.style.opacity = this.endOpacity;
        this.element.style.left    = this.oldLeft;
        
        this.customFinalize();
    };
    
    return job;
}
SLib.slideInLeft = function(element, time, finalize, distance, calculation) {
    if(element == null) {
        console.error("No element in SLib.slideInLeft");
        return;
    }

    if(time == null)
        time = 250;
    if(typeof finalize != "function")
        finalize = function() {};
    if(typeof calculation != "function")
        calculation = function(percentage) {
			return percentage;
		};
	if(distance == null)
	    distance = 250;

    job = new SLib.animationBackend.basicJob();
    job.element = element;
    job.totalTime = time;
    job.calc = calculation;
    job.customFinalize = finalize;
    
    job.oldLeft  = parseFloat( SLib.cs(element).left  ) || 0.0;
    job.oldRight = parseFloat( SLib.cs(element).right ) || 0.0;
    job.endOpacity = parseFloat( SLib.cs(element).opacity ) || 1.0;
    element.style.opacity = 0.0; /* no flickering */
    
    job.distance = distance;
    
    if(element.style.display == "none")
        element.style.display = "block";
    
    /* setup position: */
    if( SLib.cs(element).position == "static" ) {
        element.style.position = "relative";
        element.style.left = "0px";
        element.style.right = "0px";
    }

    job.think = function(p) {
        if(p >= 1) {
            p = 1.0;
            this.done = true;
        }
        this.element.style.right = this.oldRight +    (this.distance*(1 - this.calc(p))) +"px";
        this.element.style.left  = this.oldLeft  + -1*(this.distance*(1 - this.calc(p))) +"px";
        this.element.style.opacity = this.endOpacity * (this.calc(p));
    };
    job.finalize = function() {
        this.element.style.opacity = this.endOpacity;
        this.element.style.left    = this.oldLeft;
        this.element.style.right   = this.oldRight;
        
        this.customFinalize();
    };
    
    return job;
}
