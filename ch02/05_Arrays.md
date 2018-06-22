《《《 [返回首页](../README.md)       <br/>
《《《 [上一节](04_The_Get_and_Put_Principle.md)

### 数组

在 `Java` 中对列表和数组的处理进行比较是有益的，同时牢记替换原则和获取和放置原则。

在 `Java` 中，数组的子类型是协变的，这意味着当 `S` 是 `T` 的子类型时，类型 `S []` 被认为是 `T []` 的一个子类型。考虑下面的代码片段，它分配一个整数
数组，分配一个数组 的数字，然后尝试在数组中分配一个 `double`：
  
```java
  Integer[] ints = new Integer[] {1,2,3};
  Number[] nums = ints;
  nums[2] = 3.14; // array store exception
  assert Arrays.toString(ints).equals("[1, 2, 3.14]"); // uh oh!
```
  
这个程序有什么问题，因为它把一个整数数组放入一个 `double` ！哪里有问题？ 由于 `Integer []` 被认为是 `Number []` 的子类型，所以根据替换原则，第二行
的赋值必须是合法的。 相反，问题出现在第三行，并在运行时被捕获。 当一个数组被分配时（如在第一行），它被标记为它的被指定的类型（它的组件类型的运行时表
示，在这个例子中是 `Integer`），并且每次数组被分配到 第三行），如果指定的类型与指定的值不兼容，则会引发数组存储异常（在这种情况下，`double` 不能存储
到 `Integer` 数组中）。

相比之下，泛型的子类型关系是不变的，意味着类型 `List<S>` 不被认为是 `List<T>` 的子类型，除了 `S` 和 `T` 相同的普通情况。 这是一个类似于前一个的代
码片段，用列表替换数组：

```java
  List<Integer> ints = Arrays.asList(1,2,3);
  List<Number> nums = ints; // 编译时报错
  nums.set(2, 3.14);
  assert ints.toString().equals("[1, 2, 3.14]"); // uh oh!
```
  
由于 `List<Integer>` 不被认为是 `List<Number>` 的子类型，因此在第二行而不是第三行检测到问题，并且在编译时检测到，而不是在运行时检测到。
  
通配符重新引入泛型的协变子类型，在当 `S` 是 `T` 的子类型时，这种类型中 `List<S>` 被认为是 `List<? extends T>` 的子类型？ 这是片段的第三个变体：  
  
```java
    List<Integer> ints = Arrays.asList(1,2,3);
    List<? extends Number> nums = ints;
    nums.set(2, 3.14); // 编译时报错
    assert ints.toString().equals("[1, 2, 3.14]"); // uh oh!
```
  
和数组一样，第三行是错误的，但是与数组相比，这个问题在编译时被检测到，而不是运行时。 该分配违反了“获取和放置原则”，因为您不能将值放入使用 `extends`
通配符声明的类型中。  
 
通配符还引入了泛型的逆变分类，当 `S` 是 `T` 的超类型（而不是子类型）时,这种类型 `List<S>` 是被认为是 `List<? super T>` 一个子类型？ 。 数组不支持
逆分类。 例如，回想一下，方法 `count` 接受了一个类型 `Collection<? super Integer>` 的参数。 并填充整数。 因为 `Java` 不允许你编写 
`<? super Integer>[]`，所以没有与数组做同样的方法。   
  
在编译时而不是在运行时检测问题会带来两个优点，一个小问题和一个主要问题。 次要优点是它更有效率。 系统不需要在运行时随身携带一个元素类型的描述，而且每
次执行一个数组赋值时，系统都不需要检查这个描述。 主要优点是编译器检测到一个常见的错误族。 这改善了程序生命周期的各个方面：编码，调试，测试和维护都变
得更简单，更快速，而且更轻量级。
  
除了错误之前被捕获的事实之外，还有许多其他原因可以将收集类更倾向于数组。集合比数组更灵活。数组支持的唯一操作是获取或设置一个组件，并且该表示是固定
的。集合支持许多额外的操作，包括测试遏制，添加和删除元素，比较或合并两个集合，以及提取列表的子列表。集合可以是列表（其中的顺序是重要的，元素可以重
复）或集合（顺序不重要，元素可能不重复），可以使用许多表示，包括数组，链表，树和散列表。最后，便利类 `Collections` 和 `Arrays` 的比较表明，集合提供
了非数组提供的许多操作，包括旋转或打乱列表的操作，查找集合的最大值以及使集合不可修改或同步。   
  
尽管如此，还是有少数情况下数组比数据集更受欢迎。 原始类型的数组更有效率，因为它们不涉及拳击; 并分配到这样的数组不需要检查数组存储异常，因为基元类型的
数组没有子类型。 尽管检查了数组存储异常，即使是使用当前代编译器的引用类型数组也可能比集合类更有效，所以您可能希望在关键的内部循环中使用数组。 与往常
一样，您应该测量性能来验证这样的设计，尤其是因为未来的编译器可能会专门优化收集类。 最后，在某些情况下，出于兼容性的原因，数组可能是优选。
   
总而言之，最好在编译时检测错误，而不是在运行时检测错误，但是 `Java` 数组在运行时被强制检测到某些错误，因为决定做出数组子类型协变。 这是一个很好的决
定？ 在泛型出现之前，这是绝对必要的。 例如，看下面的方法，这些方法用于对任何数组进行排序或使用给定值填充数组：  
 
```java
  public static void sort(Object[] a);
  public static void fill(Object[] a, Object val);
```
  
由于协变，这些方法可以用来排序或填充任何引用类型的数组。 没有协变性，没有泛型，就没有办法声明适用于所有类型的方法。 但是，现在我们已经有了泛型，协变
阵列就不再需要了。 现在我们可以给这些方法以下签名，直接说明它们适用于所有类型：  
  
```java
    public static <T> void sort(T[] a);
    public static <T> void fill(T[] a, T val);
```
  
从某种意义上讲，协变数组是早期 `Java` 版本中缺乏泛型的人为因素。 一旦你有泛型，协变数组可能是错误的设计选择，保留它们的唯一原因是向后兼容。
  
第 `6.4` 节 - 第 `6.8` 节讨论泛型和数组之间的不方便的交互。 出于多种目的，将数组视为一个已弃用的类型可能是明智的。我们回到 `6.9` 节的这一点。 
 
《《《 [下一节](06_Wildcards_Versus_Type_Parameters.md) <br/>
《《《 [返回首页](../README.md)