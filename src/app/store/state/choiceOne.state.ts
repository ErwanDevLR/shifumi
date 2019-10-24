import { State, Action, StateContext, Selector, Select } from '@ngxs/store';
import { AddChoiceOne, AddChoiceTwo } from '../actions/choiceOne.action';
import { ChoiceOneStateModel, ChoiceTwoStateModel } from '../models/ChoiceOne.model';
import { Observable } from 'rxjs';

@State<ChoiceOneStateModel>({
    name: 'choiceOne',
    defaults: {
        choiceOnes: 0
    }
})
@State<ChoiceTwoStateModel>({
    name: 'choiceTwo',
    defaults: {
        choiceTwo: 0
    }
})
export class ChoiceOneState {

    // tslint:disable-next-line: max-line-length
    @Select(state => state.choiceOne.choiceOnes) choiceOnes$: Observable<number>;

    @Selector() static choiceInfos(state: ChoiceOneStateModel) {
        return state.choiceOnes;
    }

    @Selector() static choiceTowInfo(state: ChoiceTwoStateModel) {
        return state.choiceTwo;
    }

    // tslint:disable-next-line: prefer-inline-decorator
    @Action(AddChoiceOne)
    AddChoiceOne(ctx: StateContext<ChoiceOneStateModel>, action: AddChoiceOne) {
        const state = ctx.getState();
        ctx.setState({
           ...state,
           choiceOnes: action.payload
        });
    }

    // tslint:disable-next-line: prefer-inline-decorator
    @Action(AddChoiceTwo)
    AddChoiceTwo(ctx: StateContext<ChoiceTwoStateModel>, action: AddChoiceTwo) {
        const state = ctx.getState();
        ctx.setState({
           ...state,
           choiceTwo: action.payload
        });
    }
}