import { State, Action, StateContext, Selector, Select } from '@ngxs/store';
import { AddChoiceOne } from '../actions/choiceOne.action';
import { ChoiceOneStateModel } from '../models/ChoiceOne.model';
import { Observable } from 'rxjs';

@State<ChoiceOneStateModel>({
    name: 'choiceOne',
    defaults: {
        choiceOnes: 0
    }
})
export class ChoiceOneState {

    @Select(state => state.choiceOne.choiceOnes) choiceOnes$: Observable<number>;

    // tslint:disable-next-line: prefer-inline-decorator
    @Action(AddChoiceOne)
    add(ctx: StateContext<ChoiceOneStateModel>, action: AddChoiceOne) {
        const state = ctx.getState();
        ctx.setState({
           ...state,
           choiceOnes: action.payload
        });
    }
}