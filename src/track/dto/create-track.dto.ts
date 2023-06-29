// DTO - data transfer object класс,
// который описывает те поля, которые мы ожидаем на входе в конкретную функцию.

export class CreateTrackDto {
  readonly name;
  readonly artist;
  readonly text;
  // tomat: Все что ниже, по идее можно передать потом в функцию отдельно
  //   readonly picture;
  //   readonly audio;
  //   readonly user_id;
}
