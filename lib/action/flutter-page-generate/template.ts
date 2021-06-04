import { toBigHump, toBottomLine } from './formatName'

const pageView = (pageName: string) => {
	const pageHumpName = toBigHump(pageName)
	const pageLineName = toBottomLine(pageName)

	return `
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '${pageLineName}_controller.dart';

class ${pageHumpName}Page extends GetView<${pageHumpName}Controller> {
    const ${pageHumpName}Page({Key? key}) : super(key: key);

    @override
    Widget build(BuildContext context) {
    return Scaffold(
        body: Container(),
    );
    }
}
`
}

const pageController = (pageName: string) => {
	const pageHumpName = toBigHump(pageName)

	return `
import 'package:get/get.dart';

class ${pageHumpName}Controller extends GetxController {
    final count = 0.obs;

    @override
    void onInit() {
    super.onInit();
    }

    @override
    void onReady() {}

    @override
    void onClose() {}

    increment() => count.value++;
}
`
}

const pageBindings = (pageName: string) => {
	const pageHumpName = toBigHump(pageName)
	const pageLineName = toBottomLine(pageName)

	return `
import 'package:get/get.dart';
import '${pageLineName}_controller.dart';

class ${pageHumpName}Binding extends Bindings {
    @override
    void dependencies() {
    Get.lazyPut<${pageHumpName}Controller>(() => ${pageHumpName}Controller());
    }
}
`
}

const pageModel = () => ``

export { pageView, pageController, pageBindings, pageModel }
