package movielist.domainmodel;

public class Movie {

  private final int id;
  private final String title;
  private final String description;
  private final String image;
  private final String genrer;

  public Movie(int id, String title, String description, String image, String genrer) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.image = image;
    this.genrer = genrer;
  }

  public int getId() {
    return id;
  }

  public String getTitle() {
    return title;
  }

  public String getDescription() {
    return description;
  }

  public String getImage() {
    return image;
  }

  public String getGenrer() {
    return genrer;
  }
}
