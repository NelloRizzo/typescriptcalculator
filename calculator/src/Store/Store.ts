import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit"

interface CalculatorState {
    display: string
    accumulator: number
    mustClear: boolean
    nextOperation: string
}

const initialState: CalculatorState = { display: '0', accumulator: 0, mustClear: true, nextOperation: '=' }

const operation = (state: CalculatorState): number => {
    var accumulator = state.accumulator
    const value = parseFloat(state.display)
    switch (state.nextOperation) {
        case '+':
            accumulator += value
            break;
        default:
            accumulator = value
    }
    return accumulator
}

const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        acceptDigit: (state, action: PayloadAction<string>) => {
            if (state.mustClear) {
                state.display = ''
                state.mustClear = false
            }
            state.display += action.payload
        },
        acceptZero: (state) => {
            if (state.mustClear) {
                state.display = ''
                state.mustClear = false
            }
            if (state.display.length > 0) state.display += '0'
        },
        acceptComma: (state) => {
            if (state.mustClear) {
                state.display = ''
                state.mustClear = false
            }
            if (state.display.length === 0) state.display = '0'
            if (!state.display.includes('.')) state.display += '.'
        },
        executeOperation: (state, action: PayloadAction<string>) => {
            state.accumulator = operation(state)
            state.display = "" + state.accumulator
            state.mustClear = true
            state.nextOperation = action.payload
        }
    }
})

export const { acceptDigit, acceptComma, acceptZero, executeOperation } = calculatorSlice.actions
export default calculatorSlice.reducer