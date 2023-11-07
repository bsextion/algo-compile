import { jumpGame } from "@/utils/problems/jump-game";
import { reverseLinkedList } from "@/utils/problems/reverse-linked-list";
import { search2DMatrix } from "@/utils/problems/search-a-2d-matrix";
import { twoSum } from "@/utils/problems/two-sum";
import { Problem } from "@/utils/problems/types/problem";
import { validParentheses } from "@/utils/problems/valid-parentheses";

interface ProblemMap {
    [key: string]:Problem
}
export const problems: ProblemMap = {
    'two-sum': twoSum,
    'reverse-linked-list': reverseLinkedList,
    'jump-game': jumpGame,
    'search-2d-matrix': search2DMatrix,
    'valid-parentheses': validParentheses
}