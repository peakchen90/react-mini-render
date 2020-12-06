import Reconciler, {HostConfig, ReactNodeList} from 'react-reconciler';

const hostConfig: HostConfig<any, any, any, any, any, any, any, any, any, any, any, any> = {
  /**
   * 用于分享一些上下文信息
   */
  // 获取根容器的上下文信息, 只在根节点调用一次
  getRootHostContext(rootContainerInstance) {
  },
  // 获取子节点的上下文信息, 每遍历一个节点都会调用一次
  getChildHostContext(parentHostContext, type, rootContainerInstance) {

  },

  /**
   * 节点实例的创建
   */
  // 普通节点实例创建，例如DOM的Element类型
  createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {

  },

  // 文本节点的创建，例如DOM的Text类型
  createTextInstance(text: string, rootContainerInstance, hostContext, internalInstanceHandle) {

  },
  // 决定是否要处理子节点/子文本节点. 如果不想创建则返回true. 例如ReactDOM中使用dangerouslySetInnerHTML, 这时候子节点会被忽略
  shouldSetTextContent(type, props): boolean {

  },

  /**
   * 节点树构建
   */
  // 如果节点在*未挂载*状态下，会调用这个来添加子节点
  appendInitialChild(parentInstance, child) {

  },
  // **下面都是副作用(Effect)，在’提交‘阶段被执行**
  // 添加子节点
  appendChild(parentInstance, child) {

  },
  // 添加子节点到容器节点(根节点)
  appendChildToContainer(container, child) {

  },
  // 插入子节点
  insertBefore(parentInstance, child, beforeChild) {
  },
  // 插入子节点到容器节点(根节点)
  insertInContainerBefore(container, child, beforeChild) {

  },
  // 删除子节点
  removeChild(parentInstance, child) {

  },
  // 从容器节点(根节点)中移除子节点
  removeChildFromContainer(container, child) {

  },

  /**
   * 节点挂载
   */
  // 在完成所有子节点初始化时(所有子节点都appendInitialChild完毕)时被调用, 如果返回true，则commitMount将会被触发
  // ReactDOM通过这个属性和commitMount配置实现表单元素的autofocus功能
  finalizeInitialChildren(parentInstance, type, props, rootContainerInstance, hostContext): boolean {

  },
  // 和finalizeInitialChildren配合使用，commitRoot会在’提交‘完成后(resetAfterCommit)执行, 也就是说组件树渲染完毕后执行
  commitMount(instance, type, newProps, internalInstanceHandle) {

  },

  /**
   * 节点更新
   */
  // 准备节点更新. 如果返回空则表示不更新，这时候commitUpdate则不会被调用
  prepareUpdate(instance, type, oldProps, newProps, rootContainerInstance, hostContext) {

  },
  // **下面都是副作用(Effect)，在’提交‘阶段被执行**
  // 文本节点提交
  commitTextUpdate(textInstance, oldText: string, newText: string) {

  },
  // 普通节点提交
  commitUpdate(instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) {

  },
  // 重置普通节点文本内容, 这个需要和shouldSetTextContent(返回true时)配合使用，
  resetTextContent(instance) {

  },

  /**
   * 提交
   */
  // 开始’提交‘之前被调用，比如这里可以保存一些状态，在’提交‘完成后恢复状态。比如ReactDOM会保存当前元素的焦点状态，在提交后恢复
  // 执行完prepareForCommit，就会开始执行Effects(节点更新)
  prepareForCommit(containerInfo) {

  },
  // 和prepareForCommit对应，在提交完成后被执行
  resetAfterCommit(containerInfo) {

  },

  /**
   * 调度
   */
  // 这个函数将被Reconciler用来计算当前时间, 比如计算任务剩余时间
  // ReactDOM中会优先使用Performance.now, 普通场景用Date.now即可
  now: Date.now,
  // 自定义计时器
  setTimeout(handler: (...args: any[]) => void, timeout: number) {
    setTimeout(handler, timeout);
  },
  // 取消计时器
  clearTimeout(handle) {
    clearTimeout(handle);
  },
  // 表示一个空的计时器，见👆clearTimeout的签名
  noTimeout(handle) {
  },


  /**
   * 功能开启
   */
  // 开启节点修改，一般渲染器都会开启，不然无法更新节点
  supportsMutation: true,
  // 开启持久化 ?
  supportsPersistence: false,
  // 开启hydrate，一般用于服务端渲染
  supportsHydration: false,

  /**
   * 杂项
   */
  // 获取可公开的节点实例，即你愿意暴露给用户的节点信息，用户通过ref可以获取到这个对象。一般自定义渲染器原样返回即可, 除非你想有选择地给用户暴露信息
  getPublicInstance(instance) {

  }
};

const reconciler = Reconciler(hostConfig);

const MiniRender = {
  render(element: ReactNodeList, container, callback?: () => any) {
    console.log(arguments);
    // Create a root Container if it doesnt exist
    if (!container._rootContainer) {
      container._rootContainer = reconciler.createContainer(container, false, false);
    }

    // update the root Container
    return reconciler.updateContainer(element, container._rootContainer, null, callback);
  }
};

export default MiniRender;
