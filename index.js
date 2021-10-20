class Friend {
  constructor(candyAmount, friendGroup) {
    this.candyAmount = candyAmount;
    this.friendGroup = friendGroup;
  }

  set candyAmount(candyAmount) {
    if (Number.isInteger(candyAmount) && candyAmount >= 0) {
      this._candyAmount = candyAmount;
    } else {
      throw new TypeError('Candy amount must be a positive integer');
    }
  }

  set friendGroup(friendGroup) {
    if (friendGroup === undefined || friendGroup instanceof Array) {
      this._friendGroup = friendGroup;
    } else {
      throw new TypeError('Group of friends must be an array');
    }
  }

  static isFriend(friend) {
    return friend instanceof Friend;
  }

  static GetCandyTotal1(obj) {
    if (!this.isFriend(obj)) {
      throw new TypeError('Object must be a Friend');
    }
    let total = obj._candyAmount;
    if (obj._friendGroup !== undefined) {
      for (let i = 0; i < obj._friendGroup.length; i++) {
        total += Friend.GetCandyTotal1(obj._friendGroup[i]);
      }
    }
    return total;
  }

  static GetCandyTotal2(obj) {
    if (!this.isFriend(obj)) {
      throw new TypeError('Object must be a Friend');
    }
    let total = obj._candyAmount;

    if (obj._friendGroup !== undefined) {
      total += obj._friendGroup.reduce(
        (summa, currItem) => summa + Friend.GetCandyTotal2(currItem),
        0
      );
    }
    return total;
  }
}

const friend1 = new Friend(1, [new Friend(5), new Friend(15), new Friend(1)]);
const friend2 = new Friend(2, [new Friend(3), new Friend(8)]);
const friend3 = new Friend(3, [friend1, friend2]);
console.log(Friend.GetCandyTotal1(friend3));
console.log(Friend.GetCandyTotal2(friend3));
