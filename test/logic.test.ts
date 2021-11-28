import { logic } from "../src/logic";

describe("logic", () => {

  function returnTrue() {
    return true;
  }
  function returnFalse() {
    return false;
  }
  async function aReturnTrue() {
    return true;
  }
  async function aReturnFalse() {
    return false;
  }
  it("should sync allTrue/anyTrue", () => {

    expect(logic.allTrue(true, true, true)).toBeTruthy();
    expect(logic.anyTrue(true, true, true)).toBeTruthy();
    expect(logic.allTrue(returnTrue, returnTrue, returnTrue)).toBeTruthy();
    expect(logic.anyTrue(returnTrue, returnTrue, returnTrue)).toBeTruthy();

    expect(logic.anyTrue(true, false, false)).toBeTruthy();
    expect(logic.anyTrue(returnTrue, false, false)).toBeTruthy();

    expect(logic.allTrue(true, true, false)).toBeFalsy();
    expect(logic.allTrue(returnTrue, true, returnFalse)).toBeFalsy();

    expect(logic.anyTrue(false, false, false)).toBeFalsy();
    expect(logic.anyTrue(returnFalse, returnFalse, returnFalse)).toBeFalsy();


  });

  it("should support async allTrue/anyTrue", async () => {


    expect(await logic.asyncAllTrue(true, true, true)).toBeTruthy();
    expect(await logic.asyncAnyTrue(true, true, true)).toBeTruthy();
    expect(await logic.asyncAllTrue(returnTrue, returnTrue, returnTrue)).toBeTruthy();
    expect(await logic.asyncAllTrue(aReturnTrue, aReturnTrue, aReturnTrue)).toBeTruthy();
    expect(await logic.asyncAnyTrue(returnTrue, returnTrue, returnTrue)).toBeTruthy();
    expect(await logic.asyncAnyTrue(aReturnTrue, aReturnTrue, aReturnTrue)).toBeTruthy();

    expect(await logic.asyncAnyTrue(true, false, false)).toBeTruthy();
    expect(await logic.asyncAnyTrue(returnTrue, false, false)).toBeTruthy();
    expect(await logic.asyncAnyTrue(aReturnTrue, false, false)).toBeTruthy();

    expect(await logic.asyncAllTrue(true, true, false)).toBeFalsy();
    expect(await logic.asyncAllTrue(returnTrue, true, returnFalse)).toBeFalsy();
    expect(await logic.asyncAllTrue(aReturnTrue, true, aReturnFalse)).toBeFalsy();

    expect(await logic.asyncAnyTrue(false, false, false)).toBeFalsy();
    expect(await logic.asyncAnyTrue(returnFalse, returnFalse, returnFalse)).toBeFalsy();
    expect(await logic.asyncAnyTrue(aReturnFalse, aReturnFalse, aReturnFalse)).toBeFalsy();

  });


});
