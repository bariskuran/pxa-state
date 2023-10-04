# pxaState

/\*\*

KULLANIM

Context için 2 2 alternatif var. Eğer içiçe geçmiş context yapıları varsa üst seviyedeki contexte ulaşmak için
useContext'i dışarıda çağırıp export edebiliriz.

    const testFunction1 = (str, boo, state) => {};
    const testFunction2 = ({ str, boo }, state) => {};

    export const globalContext = createContext();
    export const App = () => (
        <PxaProvider
            initialState={{ test1: 0, test2: 0, test3: 0 }}
            settings={{ immutableKeyName: "value", testFunction1 }}
            context={globalContext}
        >
            <PxaProvider
                initialState={{ test1: 10, test2: 10, test3: 10 }}
                settings={{ immutableKeyName: "value", testFunction2 }}
            >
                <Children />
            </PxaProvider>
        </PxaProvider>
    );

    const Children = () => {
        const { test1, set: globalSet, testFunction1 } = usePxaContext(globalContext);
        const { test2, set, testFunction2 } = usePxaContext();
        const state3 = usePxaState("val", {
            immutableKeyName: "value",
            testFunction,
            testFunction2,
        });

        const onClick = () => {
            testFunction("This is a string", true)
            testFunction2({ str: "this is a string", boo: true })
        }

        ... rest of component
    }

SET METHODLARI

    // new type + new variable can be set
        state.set();
        state.set("newData");
        state.set([1,2,3]);
        ...etc.

    // if state is immutable (!==object) this is a way to set
        state.set(state.value + 1);

    // if state is immutable this is a common way to set.
    // keep in mind "value" key name can be changed via PxaProvider > settings > immutableKeyName
        state.set(d=>{
            d.value = d.value + 1;
        })

    // if state is mutable this is a common way to set.
        state.set(d=>{
            d.test1 = d.test1 + 1;
        })

ADD - REMOVE - REPLACE fonksiyonları eklenecek.

PROS - CONS

    ++ React context'i içinde herhangi bir data güncellendiğinde,
        contexti kullanmıyor olsa da altındaki tüm componentleri yeniden re-renderlıyor.
        Ancak bu yapı, sadece contexti kullanan componentleri re-renderlıyor.

    -- React Context'e göre daha mantıklı olsa da yine de contexti kullanıp, değişen datayı kullanmayan componentlerin bile
        re-render edilmesi hoş değil. Bunu zustand ile çözmeye çalışacağım.

    ++ Immer kütüphanesini kullanırken immutable verilerin işlenmesi görece daha zor.

    ++ Immer kütüphanesini kullanırken veri tipinin set aşamasında belirtilmesi gerekiyor.
        const [state,setState] = useImmer({}); gibi...
        Ancak bu advanced yapı ile set aşamasında typeın belirtilmesi gerekmez.
        const state = usePxaState();  gibi...

    ++ Immer kütüphanesi state ve set'i ayrı ayrı gönderir. Dolayısıyla izole fonksiyonlara gönderilecek arguman sayısı artar.
        Ancak bu kütüphanede set zaten state'in içinde olduğu için taşınması, aktarılması daha kolay olur.

    ++ Bu kütüphane, "set" dışında add, remove, replace gibi ek fonksiyonlarla da güçlendirilmiştir.

    -- Aynı anda 2 farklı contexte bağlanıldığında fonksiyon isimlerinde çakışma yaşanıyor.
        const { set: globalSet } = usePxaContext(globalContext);
        const { set } = usePxaContext();

\*/

# pxa-state
