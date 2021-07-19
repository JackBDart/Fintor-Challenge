/* eslint-disable quotes */
/* eslint-disable block-scoped-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');

const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const userTable = 'User';
  const recipeTable = 'Recipe';
  const orderTable = 'Order';
  const body = JSON.parse(event.body);
  const buyerId = body.buyerID;
  const sellerId = body.sellerID;
  const recipeId = body.recipeID;

  let params = {
    TableName: userTable,
    Key: {
      id: buyerId,
    },
  };

  try {
    var buyer = await docClient.get(params).promise();
  } catch (error) {
    return error;
  }

  params = {
    TableName: userTable,
    Key: {
      id: sellerId,
    },
  };

  try {
    var seller = await docClient.get(params).promise();
  } catch (error) {
    return error;
  }

  params = {
    TableName: recipeTable,
    Key: {
      id: recipeId,
    },
  };

  try {
    var recipe = await docClient.get(params).promise();
  } catch (error) {
    return error;
  }

  const timestamp = new Date();
  const order = {
    id: uuidv4(),
    item: recipe,
    date: timestamp,
    price: recipe.price,
    seller,
    buyer,
  };

  try {
    await docClient.put({
      TableName: orderTable,
      Item: order,
    }).promise();
  } catch (error) {
    return error;
  }

  const updatedrecipebuyers = recipe.purchasers.push(buyer);

  params = {
    TableName: recipeTable,
    Key: {
      id: recipeId,
    },
    UpdateExpression: "set purchasers = :val",
    ExpressionAttributeValues: {
      ":val": updatedrecipebuyers,
    },
  };

  try {
    await docClient.update(params).promise();
  } catch (error) {
    return error;
  }

  const updatedUserBuy = buyer.buyTransactions.push(order);
  const updatedPurchased = buyer.purchasedRecipes.push(recipe);

  params = {
    TableName: userTable,
    Key: {
      id: buyerId,
    },
    UpdateExpression: "set cookingCoin = cookingCoin - :val, buyTransactions = :val2, purchasedRecipes = :val3",
    ExpressionAttributeValues: {
      ":val": order.price,
      ":val2": updatedUserBuy,
      ":val3": updatedPurchased,
    },
  };

  try {
    await docClient.update(params).promise();
  } catch (error) {
    return error;
  }

  const updatedUserSell = seller.sellTransactions.push(order);

  params = {
    TableName: userTable,
    Key: {
      id: sellerId,
    },
    UpdateExpression: "set cookingCoin = cookingCoin + :val, sellTransactions = :val2",
    ExpressionAttributeValues: {
      ":val": order.price,
      ":val2": updatedUserSell,
    },
  };

  try {
    await docClient.update(params).promise();
    return true;
  } catch (error) {
    return error;
  }
};
