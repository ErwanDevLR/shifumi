import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddChoiceOne } from '../actions/choiceOne.action';
import { ChoiceOne } from '../models/ChoiceOne.model';

export class ChoiceOneStateModel {
    choiceOnes: ChoiceOne[];
}

@State<ChoiceOneStateModel>({
    name: 'choiceOne',
    defaults: {
        choiceOnes: []
    }
})
export class ChoiceOneState {

    // tslint:disable-next-line: prefer-inline-decorator
    @Selector()
    static getUsers(state: ChoiceOneStateModel) {
        return state.choiceOnes;
    }

    // tslint:disable-next-line: prefer-inline-decorator
    @Action(AddChoiceOne)
    add({getState, patchState }: StateContext<ChoiceOneStateModel>, { payload }: AddChoiceOne) {
        const state = getState();
        patchState({
            choiceOnes: [...state.choiceOnes, payload]
        });
    }
}