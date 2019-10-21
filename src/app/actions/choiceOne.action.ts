import { ChoiceOne } from '../models/ChoiceOne';

export class AddChoiceOne {
    static readonly type = '[ChoiceOne] Add';

    constructor(public payload: ChoiceOne) {}
}