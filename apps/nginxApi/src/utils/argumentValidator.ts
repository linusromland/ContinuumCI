type argumentValidator = {
	argument: string;
	type: 'string' | 'number' | 'boolean' | 'object';
	array?: boolean;
	required?: boolean;
}

// Allows any here because the arguments are not known at compile time
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const argumentValidator = (tests: argumentValidator[], args: any) => {
	for(const test of tests) {
		if (['string', 'number', 'boolean', 'object'].includes(test.type)) {
			if (typeof args[test.argument] !== test.type) {
				throw new Error(`Invalid type for argument ${test.argument}`);
			}
		}
	}
	
	for(const test of tests) {
		if(typeof args[test.argument] !== test.type){
			throw new Error(`Invalid type for argument ${test.argument}`);
		}

		if(test.array && !Array.isArray(args[test.argument])){
			throw new Error(`Argument ${test.argument} is not an array`);
		}

		if(test.required && !args[test.argument]){
			throw new Error(`Argument ${test.argument} is required`);
		}

		if(test.array && test.required && !args[test.argument].length){
			throw new Error(`Argument ${test.argument} is required`);
		}
	}
}

export default argumentValidator;