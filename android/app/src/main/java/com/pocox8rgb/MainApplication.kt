override fun getPackages(): List<ReactPackage> =
    PackageList(this).packages.apply {
        // Packages that cannot be autolinked yet can be added manually here, for example:
        // add(MyReactNativePackage())
        
        // ADD YOUR PACKAGE HERE:
        add(PocoNotificationPackage())
    }
