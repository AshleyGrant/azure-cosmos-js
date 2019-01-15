import assert from "assert";
import { Container } from "../../client";
import { extractPartitionKey } from "../../extractPartitionKey";
import { PartitionKind } from "../../documents";

describe("extractPartitionKey", function() {
  describe("With undefined partitionKeyDefinition", function() {
    it("should return undefined", function() {
      const document: any = {};
      const result = extractPartitionKey(document, undefined);
      assert.equal(result, undefined);
    });
  });

  describe("With a defined partitionKeyDefinition", function() {
    const partitionKeyDefinition = { paths: ["/a/b"], kind: PartitionKind.Hash };

    it("should return [{}] when document has no partition key value", function() {
      const document = {};
      const result = extractPartitionKey(document, partitionKeyDefinition);
      assert.deepEqual(result, [{}]);
    });

    it("should return [null] when document has a null partition key value", function() {
      const document: any = { a: { b: null } };
      const result = extractPartitionKey(document, partitionKeyDefinition);
      assert.deepEqual(result, [null]);
    });

    it("should return [{}] when document has a partially defined partition key value", function() {
      const document = { a: "some value" };
      const result = extractPartitionKey(document, partitionKeyDefinition);
      assert.deepEqual(result, [{}]);
    });

    it("should return [value] when document has a valid partition key value", function() {
      const document = { a: { b: "some value" } };
      const result = extractPartitionKey(document, partitionKeyDefinition);
      assert.deepEqual(result, ["some value"]);
    });
  });
});