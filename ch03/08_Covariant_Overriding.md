《《《 [返回首页](../README.md)       <br/>
《《《 [上一节](07_Bridges.md)

### 协变覆盖

`Java 5` 支持协变方法重写。 这个特性与泛型没有直接关系，但我们在这里提到它，因为它值得了解，并且因为它使用了上一节中描述的桥接技术来实现。

在 `Java 1.4` 及更早版本中，只有参数和返回类型完全匹配时，一个方法才能覆盖另一个方法。 在 `Java 5` 中，如果参数类型完全匹配，并且重写方法的返回类型
是另一个方法的返回类型的子类型，则方法可以重写另一个方法。

`Object` 类的克隆方法说明了协变覆盖的优点：

```java
class Object {
  ...
  public Object clone() { ... }
}
```

在 `Java 1.4` 中，任何覆盖 `clone` 的类都必须给它完全相同的返回类型，即 `Object`：

```java
class Point {
  public int x;
  public int y;
  public Point(int x, int y) { this.x=x; this.y=y; }
  public Object clone() { return new Point(x,y); }
}
```

在这里，尽管克隆总是返回一个 `Point`，但规则要求它具有返回类型 `Object`。 这很烦人，因为每次克隆的调用都必须输出结果。

```java
  Point p = new Point(1,2);
  Point q = (Point)p.clone();
```

在 `Java 5` 中，可以给克隆方法一个更重要的返回类型：

```java
class Point {
  public int x;
  public int y;
  public Point(int x, int y) { this.x=x; this.y=y; }
  public Point clone() { return new Point(x,y); }
}
```

现在我们可以克隆无须转换：

```java
Point p = new Point(1,2);
Point q = p.clone();
```

协变覆盖使用前一节中描述的桥接技术来实现。 和以前一样，如果您应用反射，您可以看到桥。 这里是在类 `Point` 中找到名称为 `clone` 的所有方法的代码：

```java
for (Method m : Point.class.getMethods())
  if (m.getName().equals("clone"))
    System.out.println(m.toGenericString());
```

在Point类的协变版本上运行此代码会产生以下输出：

```java
public Point Point.clone()
public bridge java.lang.Object Point.clone()
```

这里桥接技术利用了这样一个事实，即在类文件中，同一类的两个方法可能具有相同的参数签名，尽管这在 `Java` 源代码中是不允许的。 桥接方法只是简单地调用第一
种方法。 （同样，在撰写本文时，`Sun JVM` 打印出的是 `volatile` 而不是桥。）

《《《 [下一节](../ch04/00_Declarations.md)      <br/>
《《《 [返回首页](../README.md)
