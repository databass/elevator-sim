/*
*
* Simulation Timer
*
*/

;(function(SimulationContext, $, undefined){
	SimulationContext.Timer = function(_onTick, _waitTime){
		var shouldWait = _waitTime !== undefined, // if wait fn should be used
			waitTimeout = null, // timeout id holder for waitFn
			nextFn = null, // the next function to run on tick
			ticks = 0; // number of ticks since start or reset
		
		var tickFn = function(){
			_onTick();
			ticks = ticks + 1;
		}; // end of tickFn
		
		var clearTicksFn = function(){
			ticks = 0;
		}; // end of clearTicksfn
		
		var noWaitFn = function(tick){
			tick();
			nextFn(tick);
		}; // end of noWaitFn
		
		var waitFn = function(time){
			return function(tick){
				waitTimeout = setTimeout(function(){
					noWaitFn(tick);
				},time); // end setTimout
			}; // end return Fn
		}; // end waitFn
		
		
		
		var initFn = function(){
			if(shouldWait) nextFn = waitFn(_waitTime);
			else nextFn = noWaitFn;
		}; // end of initFn
		
		var startFn = function(){
			initFn();
			nextFn(tickFn); // kick off simulation
		}; // end of startFn
		
		var stopFn = function(){
			if(shouldWait && waitTimeout !== null){
				clearTimeout(waitTimeout);
			}
			nextFn = function(){};
		}; // end of stopFn
		
		return {
			start: startFn,
			stop: stopFn,
			ticks: function(){return ticks;},
			resetTicks: clearTicksFn
		}; // end of return
		
	}; // end of Timer
})(window.SimulationContext, jQuery);