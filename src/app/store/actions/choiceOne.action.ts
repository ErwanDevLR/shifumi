
export class AddChoiceOne {
    static readonly type = '[ChoiceOne] Add';

    constructor(public payload: number) {}
}

export class AddChoiceTwo {
    static readonly type = '[ChoiceTwo] Add';

    constructor(public payload: number) {}
}
