<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
	import { computed, onMounted, PropType } from 'vue'
	import PlusIcon from 'vue-material-design-icons/Plus.vue'
	import MinusIcon from 'vue-material-design-icons/Minus.vue'
	import ArrowRightIcon from 'vue-material-design-icons/ArrowRight.vue'
	import CheckIcon from 'vue-material-design-icons/Check.vue'
	import AlertIcon from 'vue-material-design-icons/AlertCircleOutline.vue'
	import { Spinner } from '../../AppIcons/index.js'
	import { Logger } from '../../../helpers/index.ts'

	import { SignalingType } from '../../../Types/index.ts'

	const model = defineModel<string | number>({
		required: true,
		type: [ String, Number ],
	})
	const numericModelValue = computed(() => typeof model.value === "number" ? model.value : parseInt(model.value))

	const vInputFocus = {
		mounted: (el) => {
			if (props.focus) el.focus()
		}
	}

	const props = defineProps({
		signalingClass: {
			type: String as PropType<SignalingType>,
			default: SignalingType.None,
		},
		placeholder: {
			type: String,
			default: '',
		},
		type: {
			type: String as PropType<'text' | 'email' | 'number' | 'url'>,
			default: 'text',
		},
		inputmode: {
			type: String as PropType<'text' | 'none' | 'numeric' | 'email' | 'url'>,
			default: null,
		},
		useNumModifiers: {
			type: Boolean,
			default: false,
		},
		modifierStepValue: {
			type: Number,
			default: 1,
		},
		numMax: {
			type: Number,
			default: null,
		},
		numMin: {
			type: Number,
			default: null,
		},
		numWrap: {
			type: Boolean,
			default: false,
		},
		focus: {
			type: Boolean,
			default: false,
		},
		submit: {
			type: Boolean,
			default: false,
		},
		helperText: {
			type: String,
			default: null,
		},
		label: {
			type: String,
			default: null,
		},
	})

	const emit = defineEmits(['input', 'change', 'submit'])

	const computedSignalingClass = computed(() => {
		if (props.signalingClass === SignalingType.Valid) return SignalingType.Success
		if (props.signalingClass === SignalingType.InValid) return SignalingType.Error
		return props.signalingClass
	})

	const isNumMinSet = computed(() => props.numMin !== null)
	const isNumMaxSet = computed(() => props.numMax !== null)
	const checking = computed(() => !props.useNumModifiers && computedSignalingClass.value === SignalingType.Checking)
	const error = computed(() => !checking.value && !props.useNumModifiers && computedSignalingClass.value === SignalingType.Error)
	const success = computed(() => !checking.value && !props.useNumModifiers && computedSignalingClass.value === SignalingType.Success && !props.submit)
	const showSubmit = computed(() => !checking.value && !props.useNumModifiers && props.submit && computedSignalingClass.value !== SignalingType.Error)

	/**
	 * Check if numMin is less than numMax, if both are set
	 * Returns false in case of failed validation and just logs a warning
	 */
	function assertBoundaries() {
		if (isNumMinSet.value && isNumMaxSet.value && props.numMin >= props.numMax) {
			Logger.warn('numMin is greater or equal than numMax. Validation will be skipped.')
			return false
		}
		return true
	}

	/**
	 * Check if value is within numMin and numMax
	 * @param {number} value Value to be checked
	 * @return {number} value kept within defined boundaries
	 */
	function numCheckBoundaries(value) {
		if (isNumMaxSet.value && value > props.numMax) {
			if (
				props.numWrap && isNumMinSet.value
				&& assertBoundaries()
				&& numericModelValue.value === props.numMax
			) {
				value = props.numMin
			} else {
				value = props.numMax
			}
		}

		if (isNumMinSet.value && value < props.numMin) {
			if (
				props.numWrap &&
				isNumMaxSet.value
				&& assertBoundaries()
				&& numericModelValue.value === props.numMin
			) {
				value = props.numMax
			} else {
				value = props.numMin
			}
		}

		return value
	}

	/**
	 *  Add modifierStepValue to value
	 */
	function add() {

		const nextValue = numCheckBoundaries(numericModelValue.value + props.modifierStepValue)

		if (model.value !== nextValue) {
			model.value = nextValue
			emit('change')
		}
	}

	/**
	 * Subtract modifierStepValue from value respecting wrapping and boundaries
	 * emits 'change' event if model.value has changed
	 */
	function subtract() {
		const nextValue = numCheckBoundaries(numericModelValue.value - props.modifierStepValue)

		if (model.value !== nextValue) {
			model.value = nextValue
			emit('change')
		}
	}

	onMounted(() => {
		assertBoundaries()
	})

</script>

<template>
	<div :class="['input-div', { numeric: useNumModifiers }]">
		<label v-if="label">
			{{ label }}
		</label>

		<div class="input-wrapper">
			<!-- <input ref="input" -->
			<input v-model="model"
				v-input-focus
				:type="type"
				:inputmode="inputmode"
				:placeholder="placeholder"
				:class="[{ 'has-modifier': useNumModifiers, 'has-submit': submit }, computedSignalingClass]"
				@input="emit('input')"
				@change="emit('change')"
				@keyup.enter="emit('submit')">

			<Spinner v-if="checking" class="signaling-icon spinner" />
			<AlertIcon v-else-if="error" class="signaling-icon error" />
			<CheckIcon v-else-if="success" class="signaling-icon success" />
			<ArrowRightIcon v-else-if="showSubmit" class="signaling-icon submit" @click="emit('submit')" />
			<MinusIcon v-if="useNumModifiers" class="modifier subtract" @click="subtract()" />
			<PlusIcon v-if="useNumModifiers" class="modifier add" @click="add()" />
		</div>

		<div v-if="helperText!==null" :class="['helper', computedSignalingClass]">
			{{ helperText }}
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.input-div {
		--input-height: 44px;
		position: relative;
		margin-bottom: var(--default-grid-baseline);

		label {
			display: block;
			margin-bottom: 2px;
		}

		input {
			margin: 0;

			&.has-submit,
			&.error,
			&.success,
			&.checking {
				padding-right: var(--input-height);
			}

			&.has-modifier {
				padding: 0 var(--input-height);
			}

			&.error {
				border-color: var(--color-error);
			}

			&.success {
				border-color: var(--color-success);
			}
		}

		.input-wrapper {
			position: relative;
			display: flex;
			& > input {
				// height: 44px !important;
				flex: 1;
			}
		}

		.helper {
			min-height: 1.5rem;
			font-size: 0.8em;
			opacity: 0.8;
			&.error {
				opacity: 1;
				color: var(--color-error)
			}
		}

		&.numeric .input-wrapper {
			min-width: 9rem;
			max-width: 10rem;
			input {
				text-align: center;
			}
		}

		.signaling-icon {
			position: absolute;
			right: 0;
			width: var(--input-height);
			height: var(--input-height);
		}

		.modifier {
			position: absolute;
			height: 100%;
			width: var(--input-height);
			border-color: var(--color-border-dark);
			cursor: pointer;

			&:hover {
				background-color: var(--color-background-hover)
			}

			&.add {
				right: 0;
				border-left: solid 2px var(--color-border-maxcontrast);
				border-radius: 0 var(--border-radius) var(--border-radius) 0;
			}

			&.subtract {
				border-right: solid 2px var(--color-border-maxcontrast);
				border-radius: var(--border-radius) 0 0 var(--border-radius);
			}
		}
	}
</style>
