class RelationsUpdater {
  public static replaceOneRelation<T>(task: T, propertyName: keyof T, id?: number) {
    if (!id) return;

    (task[propertyName] as any) = { id };
  }

  public static getReplaceableOneRelationResult(id?: number) {
    if (!id) return;

    return { id };
  }

  public static replaceManyRelation<T>(task: T, propertyName: keyof T, ids?: number[]) {
    if (!ids || !ids.length) return;

    (task[propertyName] as any) = ids.map((id) => ({ id }));
  }

  public static getReplaceableManyRelationResult(ids?: number[]) {
    if (!ids || !ids.length) return;

    return ids.map((id) => ({ id }));
  }
}

export default RelationsUpdater;
