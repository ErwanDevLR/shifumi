import { ChoiceOne } from '../models/ChoiceOne.model';

export class AddChoiceOne {
    static readonly type = '[ChoiceOne] Add';

    constructor(public payload: ChoiceOne) {}
}