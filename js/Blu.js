localStorage.BluName = "BluJays";
localStorage.BluVersion = "1.0.0";
localStorage.BluDeveloper = "Adam Oates";
localStorage.BluDevCompany = "Gigaboy Web Designs";

function idElErr() {
	throw new Error("Parameter id was not defined for Blu(id)...");
}

var ALIGN = {
	LEFT: {value: 0, name: "Left", code: "L"},
	CENTER: {value: 1, name: "Center", code: "C"},
	RIGHT: {value: 2, name: "Right", code: "R"}
};

function BluJay(id) {
	
	// Element from id.
	var idEl = (id !== undefined) ? document.querySelector(id) : undefined;
	var id = id;
	
	// Get or set value.
	this.vlu = function(val) {
		if (idEl !== undefined) {
			if (val === undefined) {
				switch (idEl.tagName.toLowerCase()) {
					case "input":
					case "textarea":
					case "option":
					case "param":
					case "button":
					case "li":
					case "progress":
						return idEl.value;
						break;
					default:
						return idEl.innerHTML;
				}
			} else {
				switch (idEl.tagName.toLowerCase()) {
					case "input":
					case "textarea":
					case "option":
					case "param":
					case "button":
					case "li":
					case "progress":
						idEl.value = val;
						break;
					default:
						idEl.innerHTML = val;
				}
			}
		} else {
			idElErr();
		}
	};
	
	// Get or set CSS.
	this.css = function(params) {
		if (idEl !== undefined) {
			if (typeof params === "object") {
				for (var prop in params) {
	    			idEl.style[prop] = params[prop];
	    		}
    		} else {
    			return window.getComputedStyle(idEl).getPropertyValue(params);
    		}
		} else {
			idElErr();
		}
	};
	
	// Toggle display.
	this.display = function() {
		if (idEl !== undefined) {
			if (Blu(id).css("display") == "none") {
				Blu(id).css({display: "block"});
			} else {
				Blu(id).css({display: "none"});
			}
		} else {
			idElErr();
		}
	};
	
	// Get tag name.
	this.tagName = function() {
		if (idEl !== undefined) {
			return "<" + idEl.tagName + ">";
		} else {
			idElErr();
		}
	};
	
	// Remove HTML element.
	this.destroy = function() {
		if (idEl !== undefined) {
			idEl.parentElement.removeChild(idEl);
		} else {
			idElErr();
		}
	};
	
	// Bind event on click.
	this.click = function(clkEvt) {
		if (idEl !== undefined) {
			if (clkEvt !== undefined) {
				idEl.addEventListener("click", clkEvt, false);
			} else {
				idEl.click();
			}
		} else {
			idElErr();
		}
	};
    
    // x.addEventListener shortened.
    this.ael = function(evtType, evt) {
        if (idEl !== undefined) {
            if ((evtType !== undefined) && (evt !== undefined)) {
                idEl.addEventListener(evtType, evt, false);
            } else {
                throw new Error("Parameters evtType or evt has not been defined for Blu(...).ael(evtType, evt);");
            }
        } else {
            idElErr();
        }
    };
    
    // Animate stuff with CSS transition.
    this.animate = function(prop, vlu, t) {
        Blu(id).css({transition: prop + " " + t / 1000 + "s"});
        Blu(id).css({[prop]: vlu});
    };
    
    // Animate a rotation.
    this.rotate = function(d, t) {
        Blu(id).css({transition: "transform " + t / 1000 + "s ease-in-out"});
        Blu(id).css({transform: "rotate(" + d + "deg"});
    };
    
    // Get degrees of rotation on an object.
    this.rotation = function() {
        var matrix = Blu(id).css("-webkit-transform") ||
                    Blu(id).css("-moz-transform")    ||
                    Blu(id).css("-ms-transform")     ||
                    Blu(id).css("-o-transform")      ||
                    Blu(id).css("transform");
        
        if(matrix !== 'none') {
            var values = matrix.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
        } else var angle = 0;
        
        return (angle < 0) ? angle +=360 : angle;
    };
    
    // Radios and checkboxes check?
    this.checked = function(b) {
    	if (b !== undefined) {
        	idEl.checked = b;
        } else {
        	return idEl.checked;
        }
    };
    
    // Upload using AJAX and return progress.
    this.upload = function(data) {
        var file = idEl,
            prog = data.progressBar,
            xhr = new XMLHttpRequest(),
            fd = new FormData(data.formData),
            percent;
        
        fd.append("file", file.files[0]);
        
        xhr.upload.onloadstart = function(e) {
            prog.value = 0;
            prog.max = e.total;
            file.disabled = true;
        };
        
        xhr.upload.onprogress = function(e) {
            prog.value = e.loaded;
            prog.max = e.total;
            if (data.percent !== undefined) {
                data.percent.innerHTML = Math.floor((e.loaded / e.total) * 100) + "%";
            }
        };
        
        xhr.upload.onloadend = function(e) {
            file.disabled = false;
        };
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    data.success(xhr.response);
                } else {
                    if (data.error !== undefined) {
                        data.error(xhr.statusText);
                    } else {
                        throw new Error("ERROR: " + xhr.statusText + " - " + xhr.status);
                    }
                }
            }
        };
        
        xhr.open("POST", data.url, true);
        xhr.send(fd);
          
    };

    // Append to element.
    this.append = function(ele) {
    	document.querySelector(id).appendChild(ele);
    };
	
	// Methods that don't require parameter for Blu()...
	
	// Create elements.
	this.create = function(tg) {
		var ele = document.createElement(tg.tagName);
        
		if (tg.attr !== undefined) {
			var spt = tg.attr.split(",");
			for (var i = 0; i < spt.length; i++) {
				var spt2 = spt[i].split("=");
				ele.setAttribute(spt2[0], spt2[1]);
			}
		}
        
        if (tg.appendTo !== undefined) {
            document.querySelector(tg.appendTo).appendChild(ele);
        } else {
            return ele;
        }
		
		if (tg.error === undefined) {
			if (tg.tagName === undefined) {
				throw new Error("tagName was not defined in Blu().create({tagName: ...});");
			}
		} else {
			if (tg.tagName === undefined) {
				throw new Error(tg.error());
			}
		}
	};
	
	// Create unique id.
	this.uid = function() {
		var d = new Date();
		var dt = Math.round(d.getTime() / Math.floor(Math.random() * 98766 / 27)) + "-" + Math.round(d.getTime() / Math.floor(Math.random() * 98765 / 21)) + "-" + Math.round(d.getTime() / Math.floor(Math.random() * 98764 / 23));
		return dt;
	};
	
	// Create random RGB color.
	this.rgbr = function() {
		var fst = ~~(Math.random() * 255);
		var sec = ~~(Math.random() * 255);
		var thrd = ~~(Math.random() * 255);
		return "rgb(" + fst + ", " + sec + ", " + thrd + ")";
	};
	
	// Get if is interger.
	this.isInt = function(val) {
		return !isNaN(val) && parseInt(Number(val)) == val && !isNaN(parseInt(val, 10));
	};
	
	// Delay something.
	this.delay = function(evt, tm) {
		switch (tm) {
			case "quick":
				setTimeout(evt, 700);
				break;
			case "long":
				setTimeout(evt, 2150);
				break;
			default:
				if (Blu().isInt(tm) == true) {
					setTimeout(evt, tm);
				} else {
					setTimeout(evt, 1500);
				}
		}
	};
    
    // XHRHttp / AJAX Request
    this.ajax = function(data) {
        var xhr = new XMLHttpRequest();
        
        switch (data.method.toUpperCase()) {
            case "POST":
            default:
                xhr.open("POST", data.url, true);
                break;
            
            case "GET":
                xhr.open("GET", data.url + "?" + data.data, true);
                break;
        }
        
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    data.success(xhr.response);
                } else {
                    if (data.error !== undefined) {
                        data.error(xhr.statusText);
                    } else {
                        throw new Error("ERROR: " + xhr.statusText + " - " + xhr.status);
                    }
                }
            }
        };
        
        if ((data.method.toUpperCase() == "POST") || (data.method === undefined)) {
            xhr.send(data.data);
        } else {
            xhr.send();
        }
    };
}

function Blu(id) {return new BluJay(id);}