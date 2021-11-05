// unambitious object-to-object mapping library

class Reshaper<TSource, TDestination> {
  public source: TSource;
  public destination: TDestination;

  constructor(source: TSource, destination: TDestination) {
    this.source = source;
    this.destination = destination;
  }

  public static shapes<TSource, TDestination>(source: TSource, destination: TDestination) {
    const reshape = new Reshaper<TSource, TDestination>(source, destination);
    return reshape;
  }
}

class User {
  abxd: string;
}

class UserDto {
  abxd: string;
}

const reshape = Reshaper.shapes<User, UserDto>(new User(), new UserDto());
