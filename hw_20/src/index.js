const Former = (form, { onSubmit, conditions } = {}) => {
	const messages = {
		valueMissing: 'Field must have a value',
		typeMismatch: 'Email must have @ symbol',
		tooShort: 'Password length must be more thsn 9 characters'
	};

	const mapErrorMessage = (element) => {
		const validity = element.validity;

		if (validity.customError) {
			return element.validationMessage;
		}

		const errorMessage = Object.keys(messages)
			.filter((validityKey) => validity[validityKey])
			.map((errorKey) => messages[errorKey])
			.join();

		return errorMessage || element.validationMessage;
	};

	const findMessageBlock = (element, callback) => {
		const messageBlock = element.nextElementSibling;

		if (messageBlock) {
			callback(messageBlock);
		}
	};

	const getOtherValues = () => {
		const formData = new FormData(form);

		return Array.from(formData.keys()).reduce((values, key) => {
			return {
				...values,
				[key]: formData.get(key),
			};
		}, {});
	};

	const validateByCallback = (element) => {
		const validate = conditions[element.name];

		const message = validate(element, getOtherValues());

		if (!message) {
			return;
		}

		element.setCustomValidity(message);
	};

	const validateOnSubmit = () => {
		const candidatesToValidate = Object.keys(conditions).reduce(
			(candidates, key) => [...candidates, form[key]],
			[]
		);

		for (const element of candidatesToValidate) {
			const error = conditions[element.name];

			validateByCallback(element);
		}
	};

	form.addEventListener('submit', (event) => {
		validateOnSubmit();

		if (form.reportValidity()) {
			onSubmit(getOtherValues());
		}

		event.preventDefault();
	});

	form.addEventListener('input', (event) => {
		const element = event.target;

		if (element.validity.customError) {
			element.setCustomValidity('');
		}

		findMessageBlock(element, (messageBlock) => {
			if (messageBlock.hidden) {
				return;
			}

			messageBlock.textContent = '';
			messageBlock.hidden = true;
		});
	});

	const candidatesToValidate = Array.from(form.elements).filter(
		(element) => element.willValidate
	);

	for (const element of candidatesToValidate) {
		element.addEventListener('invalid', (event) => {
			event.preventDefault();

			const element = event.target;

			findMessageBlock(element, (messageBlock) => {
				messageBlock.textContent = mapErrorMessage(element);
				messageBlock.hidden = false;
			});
		});
	}
};

const conditions = {
	password: (element, otherValue) => {
		return element.value && element.value === otherValue.email && 'Password can`t be similar to email';
	},
	
	passwordConfirm: (element, otherValue) => {
		return element.value && element.value !== otherValue.password && 'Passwords do not match';
	},

	agreement: (element, otherValue) => {
		return  !element.checked && 'You must agree to continue'
	}

};

const onSubmit = (form) => {
	const output = document.querySelector('output');
	output.innerHTML = `
	<div>Email: ${form.email}</div>
    <div>Password: ${form.password}</div>`;
}

Former(document.forms.autorization, {
	onSubmit,
	conditions,
});
